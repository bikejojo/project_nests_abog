import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class PersonRepository {
    constructor(private readonly prisma:PrismaService){}

    async createPerson(data: any, tx?: Prisma.TransactionClient){
        const prisma = tx || this.prisma;
        return await prisma.persona.create({
            data:{
                ci:data.ci ,
                fullName: data.firstName ,
                //lastName: data.lastName ,
                phone: data.phone,
                address: data.address , 
                status: data.status ,
                userId: data.userId ?? null
            }
        })
    }

    async updatePersona(prisma: Prisma.TransactionClient,data:any){
        return await prisma.persona.update({
            where:{
                id:data.id
            },
            data:{
                fullName: data.firstName ,
                //lastName: data.lastName ,
                phone: data.phone ,
                address: data.address ,
                cityId: data.cityId ,
            }
        })
    }

    async deletePersona(prisma: Prisma.TransactionClient,data:any){
        return await prisma.persona.update({
            where:{
                id:data.id
            },
            data:{
                status:0
            }
        })
    }

    async findedPersona(data:any){
        return await this.prisma.persona.findUnique({
            where:{
                id:data.id
            },
            include:{
                user:true
            }
        })
    }
}