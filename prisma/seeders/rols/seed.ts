import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.role.deleteMany({});
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`);

    const roles = [
        { name: "Administrador", status: 1 },
        { name: "Abogado", status: 1 },
        { name: "Fiscal", status: 1 },
        { name: "Juez", status: 1 },
        { name: "Cliente",  status: 1 }
    ];

    const user = await prisma.user.findUnique({
        where:{ id: 1 }
    });
    

    await prisma.role.createMany({
        data: roles
    });

    if (user) {
        await prisma.user.update({
            where: { id: user.id },
            data: { roleId: 1 } // Assuming the first role is for the admin
        });
        console.log("Roles seeded successfully.");
    } else {
        console.warn("No user with id 1 found. Skipping user update.");
        console.log("Roles seeded successfully.");
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(' X  -> Error en los seeders: ', e);
        await prisma.$disconnect();
        process.exit(1);
    });