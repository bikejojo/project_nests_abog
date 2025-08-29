import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main(){
    await prisma.branch_Office.deleteMany({}); // elimina mi contenido en mi tabla manejarlo de manera personal cada rango 
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Branch_Office_id_seq" RESTART WITH 1`);

    const cities = [
        { description: 'Sucursal de Santa Cruz' , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1 },
        { description: 'Sucursal de Beni'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1  },
        { description: 'Sucursal de Pando'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1 },
        { description: 'Sucursal de Tarija'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1 },
        { description: 'Sucursal de Chuquisaca'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1 },
        { description: 'Sucursal de Cochabamba'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1 },
        { description: 'Sucursal de El Alto'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1 },
        { description: 'Sucursal de La Paz'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1  },
        { description: 'Sucursal de Oruro'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1  },
        { description: 'Sucursal de Potosi'  , status:1 , address: 'Por definir' , phone: 'Por definir' , cityId: 1  },
    ];


    await Promise.all(
        cities.map(branch_Office =>
            prisma.branch_Office.createMany({
               // No se actualiza nada en este caso
                data: {
                    name: branch_Office.description,
                    address: branch_Office.address ,
                    phone: branch_Office.phone ,
                    //cityId : branch_Office.cityId ,
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