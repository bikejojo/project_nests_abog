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
                updatedAt: data.updatedAt ,
                cityId:data.cityId
            }
        })
    }

    async updatePersona(data:any){
        return await this.prisma.persona.update({
            where:{
                id:data.id
            },
            data:{
                firstName: data.firstName ,
                lastName: data.lastName ,
                phone: data.phone ,
                address: data.address ,
                cityId: data.cityId ,
            }
        })
    }

    async deletePersona(data:any){
        await this.prisma.persona.update({
            where:{
                id:data.id
            },
            data:{
                status:data.status
            }
        })
    }

    async findedPersona(data:any){
        return await this.prisma.persona.findUnique({
            where:{
                id:data.id
            }
        })
    }
}