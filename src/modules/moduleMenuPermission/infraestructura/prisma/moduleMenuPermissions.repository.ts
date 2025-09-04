import { Injectable } from "@nestjs/common";
import { status } from "src/common/enum/typeStatus";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ModuleMenuPermissionsRepository {
    constructor ( private readonly prisma: PrismaService){}

    async listAllModuleMenuPermissions(){
        return await this.prisma.module.findMany({
            /*include:{
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
            }*/
           select:{
                id:true,
                name:true,
                moduleMenu:{
                    include:{
                        menu:{
                            select:{
                                id:true,
                                name:true,
                                menuPermissions:{
                                    include:{
                                        permissions:{
                                            select:{
                                                id:true,
                                                name:true
                                            }
                                        }
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
        return await this.prisma.moduleUser.findMany({
            where:{userId: data.id}
        })
    }

    async verificationMenuUser(data:any){
        return await this.prisma.menuUser.findMany({
            where:{userId: data.id}
        })
    }

    async verificationPermissionsUser(data:any){
        return await this.prisma.permissionsUser.findMany({
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
            data:data,
            skipDuplicates: true
        })
    }

    async createMenuUser(data:any){
        return await this.prisma.menuUser.createMany({
            data:data,
            skipDuplicates: true
        })
    }

    async verificationIfUserHasPermissions(data:any){
        return await this.prisma.permissionsUser.findMany({
            where:{
                userId:data.userId,
                permissionsId:data.permissionsId
             }
        })
    }

    async createPermissionsUser(data:any){
        return await this.prisma.permissionsUser.createMany({
            data:data,
            skipDuplicates: true
        })
    }

    async delIdUserModule(data:any){
        return await this.prisma.moduleUser.deleteMany({
            where:{userId:data.userId}
        })
    }
    async delIdUserMenu(data:any){
        return await this.prisma.menuUser.deleteMany({
            where:{userId:data.userId},
        })
    }
    async delIdUserPermissions(data:any){
        return await this.prisma.permissionsUser.deleteMany({
            where:{ userId:data.userId }
        })
    }

    async listRols(){
        return await this.prisma.role.findMany({where:{status:1}});
    }

    async roleFind(data:any){
        return await this.prisma.role.findUnique({where:{id:data.id}})
    }

    async roleCreate(data:any){
        return await this.prisma.role.create({
            data:{
                name:data.name,
                status:1
            }
        })
    }

    async roleUpdate(data:any){
        return await this.prisma.role.update({
            where:{
                id: data.id
            },
            data:{
                name:data.name
            }
        })
    }

    async roleDelete(data:any){
        return await this.prisma.role.update({
            where:{
                id:data.id
            },
            data:{
                status: 0
            }
        })
    }
}