import { Injectable } from "@nestjs/common";
import { status } from "src/common/enum/typeStatus";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ModuleMenuPermissionsRepository {
    constructor ( private readonly prisma: PrismaService){}

    async listAllModuleMenuPermissions(){
        return await this.prisma.module.findMany({
            include:{
                moduleMenu: {
                    include: {
                        menu: {
                            include: {
                                menuPermissions: {
                                    include: {
                                        permissions: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    async verificationModuleUser(data:any){
        return await this.prisma.moduleUser.findUnique({
            where:{userId: data.id}
        })
    }

    async verificationMenuUser(data:any){
        return await this.prisma.menuUser.findUnique({
            where:{userId: data.id}
        })
    }

    async verificationPermissionsUser(data:any){
        return await this.prisma.permissionsUser.findUnique({
            where: { userId: data.id }
        })
    }

    async verificationIfUserHasModule(data:any){
        return await this.prisma.moduleUser.findMany({
            where:{ 
                userId:data.userId,
                moduleId:data.moduleId
            },
            select:{
                moduleId:true
            }
        })
    }

    async verificationIfUserHasMenu(data:any){
        return await this.prisma.menuUser.findMany({
            where:{
                userId: data.userId ,
                menuId: data.menuId
            } ,
            select : {
                menuId:true
            }
        })
    }
    async createModuleUser(data:any){
        return await this.prisma.moduleUser.createMany({
            data:{
                userId:data.userId ,
                moduleId: data.moduleId ,
                status: status.ACTIVE
            }
        })
    }

    async createMenuUser(data:any){
        return await this.prisma.menuUser.createMany({
            data:{
                userId: data.userId ,
                menuId: data.menuId ,
                status: status.ACTIVE
            }
        })
    }

    async verificationIfUserHasPermissions(data:any){

    }

    async createPermissionsUser(data:any){
        return await this.prisma.permissionsUser.createMany({
            data:{
                userId:data.userId ,
                permissionsId:data.permissionsId ,
                status:status.ACTIVE
            }
        })
    }
}