import { PrismaClient , Menu } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.moduleMenu.deleteMany({});
    await prisma.menuPermissions.deleteMany({});
    await prisma.module.deleteMany({});
    await prisma.menu.deleteMany({});
    await prisma.permissions.deleteMany({});
    
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Menu_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Module_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Permissions_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "ModuleMenu_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "MenuPermissions_id_seq" RESTART WITH 1`);

    const permisosPorMenu: Record<string, Record<string, string[]>> = {
        "EMPRESA" : {
            "Usuario": [
                "Crear_usuario",
                "Editar_usuario",
                "Eliminar_usuario",
                "Listar_usuarios",
            ],
            "Permisos":[
                "Crear_permiso",
                "Editar_permiso",
                "Eliminar_permiso",
                "Listar_permisos",
                "Asignar_permisos",
            ],
            "Sucursal":[
                "Crear_sucursal",
                "Editar_sucursal",
                "Eliminar_sucursal",
            ]
        },

        "PERSONAS" :{
            "Operador":[
                "Crear_operador",
                "Editar_operador",
                "Eliminar_operador",
                "Listar_operadores",
                "Inactiva_operador",
            ],
            "Cliente":[
                "Crear_cliente",
                "Editar_cliente",
                "Eliminar_cliente",
                "Listar_clientes",
                "Inactiva_cliente",
            ],
        } ,
    
        "PROCESOS JUDICIALES":{
            "Penal":[
                "Crear_proceso_penal",
                "Listar_procesos_penales",
            ],
            "Civil":[
                "Crear_proceso_civil",
                "Listar_procesos_civiles",
            ],
            "Laboral":[
                "Crear_proceso_laboral",
                "Listar_procesos_laborales",
            ],
            "Tributario":[
                "Crear_proceso_tributario",
                "Listar_procesos_tributarios",
            ],
            "Administrativo":[
                "Crear_proceso_administrativo",
                "Listar_procesos_administrativos",
            ],
            "Ambiental":[
                "Crear_proceso_ambiental",
                "Listar_procesos_ambientales",
            ] ,
            "ACTUADOS":[
                "Registrar_actuado",
                "Listar_actuados",
            ]
        },

        "REPORTES":{
           "Reportes": [
                "Ver_reportes",
                "exportar_reportes",
            ]
        },
    };

   // 3. Crea los módulos
  const modules = await Promise.all(
    Object.keys(permisosPorMenu).map(name => prisma.module.create({ data: { name } }))
  );

  // 4. Crea los menús y asócialos a módulos con ModuleMenu
  const allMenus: Menu[] = [];
  for (const [moduleIdx, moduleName] of Object.keys(permisosPorMenu).entries()) {
    const menus = Object.keys(permisosPorMenu[moduleName]);
    for (const menuName of menus) {
      const menu = await prisma.menu.create({
        data: {
          name: menuName,
        }
      });
      allMenus.push(menu);
      await prisma.moduleMenu.create({
        data: {
          moduleId: modules[moduleIdx].id,
          menuId: menu.id
        }
      });
    }
  }

  // 5. Crea los permisos únicos
  const allPerms = Array.from(new Set(
    Object.values(permisosPorMenu).flatMap(obj => Object.values(obj).flat())
  ));
  const permissions = await Promise.all(
    allPerms.map(name =>
      prisma.permissions.create({ data: { name } })
    )
  );

  // 6. Relaciona permisos a menús
  for (const moduleName in permisosPorMenu) {
    for (const menuName in permisosPorMenu[moduleName]) {
      const menu = allMenus.find(m => m.name === menuName);
      for (const permDesc of permisosPorMenu[moduleName][menuName]) {
        const perm = permissions.find(p => p.name === permDesc);
        if (menu && perm) {
          await prisma.menuPermissions.create({
            data: {
              menuId: menu.id,
              permissionsId: perm.id
            }
          });
        }
      }
    }
  }

  console.log("✅ Seed terminado.");
}


main()
    .catch((e) => {
        console.error(' X  -> Error en los seeders: ' , e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect
    });