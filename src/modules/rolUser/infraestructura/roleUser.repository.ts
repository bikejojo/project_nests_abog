import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class roleUserRepository {

    constructor( private readonly prisma:PrismaService ){}

    async assingRoleUser(data:any){
        return await this.prisma.rolsUser.create({
            data:{
                rolId: data.rolId ,
                userId: data.userId ,
                status: 1 ,
                createdAt: new Date ,
                updatedAt: new Date
            }
        })
    }

    async findIdRolUser(data:any){
        return await this.prisma.rolsUser.findMany({
            where: {
                rolId: data.rolId,
                userId: data.userId
            }
        })
    }

    async unsubscribeRoleUser(data:any){
        return await this.prisma.rolsUser.update({
            where:{
                id:data.id
            },
            data:{
                status:0
            }
        })
    }
}