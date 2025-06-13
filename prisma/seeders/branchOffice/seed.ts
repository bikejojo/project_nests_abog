import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main(){
    await prisma.city.deleteMany({}); // elimina mi contenido en mi tabla manejarlo de manera personal cada rango 

    const cities = [
        { description: 'Sucursal de Santa Cruz' , status:1 },
        { description: 'Sucursal de Beni'  , status:1},
        { description: 'Sucursal de Pando'  , status:1},
        { description: 'Sucursal de Tarija'  , status:1},
        { description: 'Sucursal de Chuquisaca'  , status:1},
        { description: 'Sucursal de Cochabamba'  , status:1},
        { description: 'Sucursal de El Alto'  , status:1},
        { description: 'Sucursal de La Paz'  , status:1},
        { description: 'Sucursal de Oruro'  , status:1},
        { description: 'Sucursal de Potosi'  , status:1},
    ];


    await Promise.all(
        cities.map(branch_Office =>
            prisma.branch_Office.upsert({
                where: { description: branch_Office.description },
                update: {}, // No se actualiza nada en este caso
                create: {
                    description: branch_Office.description,
                    status:1
                },
            })
        )
    );
}

main()
    .catch((e) => {
        console.error(' X  -> Error en los seeders: ' , e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect
    });