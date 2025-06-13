import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const admin = await prisma.permissions.createMany({
        data:[
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
            { description:'',status:1 , createdAt:new Date , updatedAt:new Date },
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