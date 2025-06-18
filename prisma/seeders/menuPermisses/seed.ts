import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.menuPermissions.deleteMany({});
    await prisma.menu.deleteMany({});
    await prisma.permissions.deleteMany({});
    
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "MenuPermissions_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Menu_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Permissions_id_seq" RESTART WITH 1`);

    const permisosPorMenu: Record<string,string[]> = {
        "Usuario":[
            "Crear Usuario",
            "Editar Usuario",
            "Eliminar Usuario",
            "Ver Usuario",
            "Cambiar Estado Usuario"
        ],

        "Persona":[
            "Crear Persona",
            "Editar Persona",
            "Eliminar Persona",
            "Ver Persona",
            "Cambiar Estado Persona"
        ],
        
        "Documento":[
            "Crear Documento",
            "Editar Documento",
            "Eliminar Documento",
            "Ver Documento",
            "Cambiar Estado Documento"
        ],

        "Juicio":[
            "Crear Juicio",
            "Editar Juicio",
            "Eliminar Juicio",
            "Ver Juicio",
            "Cambiar Estado Juicio"
        ]
    };

    const AllPermDescription = [...new Set(Object.values(permisosPorMenu).flat())];
    
    await prisma.permissions.createMany({
        data: AllPermDescription.map(description => ({
            description,
            status: 1
        }))
    })

    const menuPermission = Object.keys(permisosPorMenu);
    
    await prisma.menu.createMany({
        data: menuPermission.map(description => ({
            name: description,
            icon: "fa-brands fa-windows", // You can replace this with actual icons if needed
            description
        }))
    })

    const [rols , permissions] = await Promise.all([
        prisma.menu.findMany(),
        prisma.permissions.findMany()
    ])

    const menuPermissionsData: {
        menuId: number;
        permissionsId: number;
        status: number;
        createdAt: Date;
        updatedAt: Date;
    }[] = [];

    for(const [area, permiso] of Object.entries(permisosPorMenu)){
        const menu = rols.find(r => r.description === area)
        
        if(!menu) continue;

        for(const permisos of permiso){
            const perm = permissions.find(p => p.description === permisos );

            if(!perm) continue;

            menuPermissionsData.push({
                menuId: menu.id,
                permissionsId: perm.id,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    }

    await prisma.menuPermissions.createMany({ data: menuPermissionsData})
    console.log('Exitoso creacion de datos.')
}

main()
    .catch((e) => {
        console.error(' X  -> Error en los seeders: ' , e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect
    });