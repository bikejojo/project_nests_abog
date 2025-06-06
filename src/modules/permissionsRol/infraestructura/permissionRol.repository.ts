import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PermissionRolRepository{
    constructor(private readonly prisma:PrismaService){}

    async assingPermissionsRol(data:any){
        return await this.prisma.permissionsRol.create({
            data: {
                rolId:data.rolId,
                permissionId:data.permissionId,
                status:data.status,
                createdAt:data.createdAt,
                updatedAt:data.updatedAt
            }
        })
    }
    
    async unsubcriptionPermissionRol(data:any){
        return await this.prisma.permissionsRol.update({
            where:{
               id: data.id
            },
            data:{
                status:0
            }
        })
    }

    async findIdPermissionsRol(data:any){
        return await this.prisma.permissionsRol.findFirst({
            where:{
                rolId: data.rolId,
                permissionId: data.permissionId
            },
        });
    }

    async findPermissionsByRolId(data:any) {
        return await this.prisma.permissionsRol.findMany({
            where:{
                rolId:data.rolId , 
            },
            
            include: {
                permission:true,
                rol: true,
            }
        })
    }
}