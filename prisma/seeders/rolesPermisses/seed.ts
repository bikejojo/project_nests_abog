import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const admin = await prisma.rols.create({
        data: {
            description:'ADMIN' ,
            status: 1,
            createdAt: new Date ,
            updatedAt: new Date
        },
    })

    const lawyer = await prisma.rols.create({
        data: {
            description:'ABOG_INT' ,
            status: 1,
            createdAt: new Date ,
            updatedAt: new Date
        },
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