import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class departamentsRepository {
    constructor(private readonly prisma:PrismaService){}

    async createdDepartaments(data:any){
        return this.prisma.departaments.create({
            data:{
                name:data.name,
                description:data.description,
                status:data.status,
                createdAt:data.createdAt,
                updatedAt:data.updatedAt
            }
        })
    }
    async updatedDepartaments(data:any){
        return this.prisma.departaments.update({where:{id:data.id}
                                                ,data:{
                                                    name: data.name,
                                                    description: data.description,
                                                    updatedAt: new Date
                                                }})
    }
    async deletedDepartaments(data:any){
        return this.prisma.departaments.update({where:{id:data.id} , data:{status:0}})
    }
    async findIdDepartaments(data:any){
        return this.prisma.departaments.findFirst({where:{id:data.id} })
    }
    async allDepartaments(){}
}