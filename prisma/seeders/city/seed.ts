import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const city = await prisma.city.createMany({
        data: [
            {description:'Santa Cruz' },
            {description:'Beni' },
            {description:'Pando' },
            {description:'Tarija' },
            {description:'Chuquisaca' },
            {description:'Cochabamba' },
            {description:'El Alto' },
            {description:'La Paz' },
            {description:'Oruro' },
            {description:'Potosi' },
        
        ]
    })
}

main()
    .catch((e) => {
        console.error(' X  -> Error en los seeders: ' , e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect
    });