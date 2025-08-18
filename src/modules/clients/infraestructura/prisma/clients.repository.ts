import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientRepository {
    constructor(private readonly prisma:PrismaService){}
    async createdClients(data:any){
        return this.prisma.clients.create({
            data:{
                personId: data.personId,
                email: data.email,
                NIT: data.NIT,
                isIntern: data.isIntern, // Make sure to provide this value when calling createdClients
                isActive: true,
                status: 1,
                createAt: new Date(),
                updateAt: new Date()
            }
        })
    }
    async updatedClients(data:any){
        return this.prisma.clients.update({where:{id:data.id}, 
            data:{
                personId: data.personId,
                email: data.email,
                NIT: data.NIT,
                updateAt: new Date(),
            }
        })
    }
    async deletedClients(data:any){
        return this.prisma.clients.update({where:{id : data.id} , data:{ status: 0}})       
    }
    async findIdClients(data:any){
        return await this.prisma.clients.findUnique({where:{id:data.id}})
    }
    async allClients(){
        return this.prisma.clients.findMany({where:{status:1}})
    }
}