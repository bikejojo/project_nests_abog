import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesRepository{
    constructor(private prisma:PrismaService){}
    
    async createRoles(data:any){
        return await this.prisma.rols.create({
            data:{
                description:data.description,
                status:data.status,
                createdAt:data.createdAt,
                updatedAt:data.updatedAt
            }
        })
    }
    async deleteRoles(data:any){
        return await this.prisma.rols.update({
            where:{id:data.id},
            data:{status:0}
        })
    }
    async allRoles(){
        return await this.prisma.rols.findMany({where:{status:1}})
    }

    async findIdRoles(data:any){
        return await this.prisma.rols.findFirst({where:{id:data.id}})
    }
}