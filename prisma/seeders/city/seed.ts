import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main(){
    await prisma.city.deleteMany({}); // elimina mi contenido en mi tabla manejarlo de manera personal cada rango 
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "City_id_seq" RESTART WITH 1`);

    const cities = [
        { description: 'Santa Cruz' },
        { description: 'Beni' },
        { description: 'Pando' },
        { description: 'Tarija' },
        { description: 'Chuquisaca' },
        { description: 'Cochabamba' },
        { description: 'El Alto' },
        { description: 'La Paz' },
        { description: 'Oruro' },
        { description: 'Potosi' },
    ];


    await Promise.all(
        cities.map(city =>
            prisma.city.upsert({
                where: { description: city.description },
                update: {}, // No se actualiza nada en este caso
                create: {
                    description: city.description,
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