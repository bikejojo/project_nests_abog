import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.permissionsRol.deleteMany({});
    await prisma.rols.deleteMany({});
    await prisma.permissions.deleteMany({});
    
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Rols_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Permissions_id_seq" RESTART WITH 1`);
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "PermissionsRol_id_seq" RESTART WITH 1`);

    const permisosPorArea: Record<string,string[]> = {
        /*ADMIN : [
            'crear_documento',
            'ver_documento',
            'editar_documento',
            'abrir_juicio',
            'cerrar_juicio',
            'ver_estado_juicio',
            'asignar_abogado',
            'ver_abogados',
            'ver_casos',
            'archivar_caso',
        ] ,*/
        DOCUMENTOS : [
            'crear_documento',
            'ver_documento',
            'editar_documento',
        ] ,
        JUICIOS :[
            'abrir_juicio',
            'cerrar_juicio',
            'ver_estado_juicio',
        ] ,
        ABOGADOS :[
            'asignar_abogado',
            'ver_abogados',
        ] ,
        CASOS : [
            'ver_casos',
            'archivar_caso',
        ],
    };

    const AllPermDescription = [...new Set(Object.values(permisosPorArea).flat())];
    
    await prisma.permissions.createMany({
        data: AllPermDescription.map(description => ({
            description,
            status: 1
        }))
    })

    const rolePermission = Object.keys(permisosPorArea);
    
    await prisma.rols.createMany({
        data: rolePermission.map(description => ({
            description
        }))
    })

    const [rols , permissions] = await Promise.all([
        prisma.rols.findMany(),
        prisma.permissions.findMany()
    ])

    const rolsPermissionsData: {
        rolId: number;
        permissionId: number;
        status: number;
        createdAt: Date;
        updatedAt: Date;
    }[] = [];

    for(const [area, permiso] of Object.entries(permisosPorArea)){
        const rol = rols.find(r => r.description === area)
        
        if(!rol) continue;

        for(const permisos of permiso){
            const perm = permissions.find(p => p.description === permisos );

            if(!perm) continue;

            rolsPermissionsData.push({
                rolId: rol.id,
                permissionId: perm.id,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    }

    await prisma.permissionsRol.createMany({ data: rolsPermissionsData})
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