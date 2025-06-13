import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const permisos = await prisma.permissions.createMany({
        data:[
            { description:'permiso 1',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 2',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 3',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 4',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 5',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 6',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 7',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 8',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 9',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'permiso 10',status:1 , createdAt:new Date , updatedAt:new Date },
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