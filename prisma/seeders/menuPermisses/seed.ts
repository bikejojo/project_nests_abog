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
                "Crear",
                "Editar",
                "Eliminar",
                "Listar",
            ],
            "Permisos":[
                "Crear",
                "Editar",
                "Eliminar",
                "Listar",
                "Asignar",
            ],
            "Sucursal":[
                "Crear",
                "Editar",
                "Eliminar",
            ]
        },

        "PERSONAS" :{
            "Operador":[
                "Crear",
                "Editar",
                "Eliminar",
                "Listar",
                "Inactiva",
            ],
            "Cliente":[
                "Crear",
                "Editar",
                "Eliminar",
                "Listar",
                "Inactiva",
            ],
        } ,
    
        "PROCESOS JUDICIALES":{
            "Penal":[
                "Crear",
                "Listar",
            ],
            "Civil":[
                "Crear",
                "Listar",
            ],
            "Laboral":[
                "Crear",
                "Listar",
            ],
            "Tributario":[
                "Crear",
                "Listar",
            ],
            "Administrativo":[
                "Crear",
                "Listar",
            ],
            "Ambiental":[
                "Crear",
                "Listar",
            ] ,
            "ACTUADOS":[
                "Registrar",
                "Listar",
            ]
        },

        "REPORTES":{
           "Reportes": [
                "Ver",
                "exportar",
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