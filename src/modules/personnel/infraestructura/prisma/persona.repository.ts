import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonRepository {
    constructor(private readonly prisma:PrismaService){}

    async createPerson(data:any){
        return await this.prisma.persona.create({
            data:{
                ci:data.ci ,
                firstName: data.firstName ,
                lastName: data.lastName ,
                phone: data.phone,
                address: data.address , 
                status: data.status ,
                createdAt: data.createdAt ,
                updatedAt: data.updatedAt
            }
        })
    }

    async updatePersona(data:any){
        return await this.prisma.persona.update({
            where:{
                id:data.id
            },
            data:{

            }
        })
    }

    async findedPersona(data:any){
        return await this.prisma.persona.findFirst({
            where:{
                id:data.id
            }
        })
    }
}