import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ClientRepository {
    constructor(private readonly prisma:PrismaService){}

    async createdClients(data: any, tx?: Prisma.TransactionClient) {
        const prisma = tx || this.prisma;
        return await prisma.clients.create({
            data: {
                email: data.email,
                cellphone: data.cellphone || data.phone,
                NIT: data.NIT,
                isIntern: data.isIntern ?? true,
                isActive: data.isActive,
                status: data.status || 1,
                personId: data.personId,
            },
            include: {
                person: true
            }
        });
    }
    async updatedClients(data:any , tx?: Prisma.TransactionClient){
        const prisma = tx || this.prisma;
        return await prisma.clients.update({
            where:{
                id:data.id
            }, 
            data:{
                personId: data.personId,
                email: data.email,
                NIT: data.NIT,
            }
        })
    }

    async deletedClients(data:any , tx?: Prisma.TransactionClient){
        const prisma = tx || this.prisma;
        return await prisma.clients.update({
            where:{id : data.id} , 
            data:{ 
                status: 0 ,
                isActive: false   
             }
        })       
    }
    async findIdClients(data:any){
        return await this.prisma.clients.findUnique({where:{id:data.id}})
    }
    async allClients(){
        return await this.prisma.clients.findMany({
            where:{
                status:1
            },
            include:{
                person:true
            }
        })
    }
}