import { PrismaClient } from "@prisma/client";
import { status, tatus } from "../../../src/common/enum/typeStatus";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(){
    try{
        const count = await prisma.user.count();

        if (count > 0) {
            const SALT_ROUNDS = 10;

            const hashedPassword = await bcrypt.hash("admin123", SALT_ROUNDS);
            const user = await prisma.user.create({
                data: {
                username: "admin",
                password: hashedPassword,
                type: 1,
                isActive: true,
                status: tatus.ACTIVE, // ojo que escribiste tatus antes
                email: "admin@admin.com",
                token: "",
                reftoken: ""
                }
            });

            const persona = await prisma.persona.create({
                data: {
                ci: "111",
                fullName: "pepe",
                phone: "12345678",
                address: "S/n",
                status: 1,
                userId: user.id // 👈 aquí ya tienes el id real
                }
            });

            await prisma.branchOfficeUser.createMany({
                data:{
                    personId:persona.id,
                    branchOffId:1
                }
            })
            console.log("Roles seeded successfully.");

        }else{
            await prisma.user.deleteMany({});
            await prisma.$executeRawUnsafe(`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`);
            const SALT_ROUNDS = 10;

            const users = [
                {
                    username: "admin",
                    password:  await bcrypt.hash("admin123", SALT_ROUNDS), 
                    type: 0,
                    isActive: true,
                    status: tatus.ACTIVE,
                    email: "admin@admin.com",
                    token: "" // or provide a default token value if needed
                }
            ]

            await prisma.user.createMany({
                data: users
            });

        }
        
        console.log("Roles seeded successfully.");
    } catch (error) {
        console.log(' X  -> Error en los seeders: ', error.message);
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