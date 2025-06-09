import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PermissionsUserRepository{
    constructor(private prisma:PrismaService){}

    async assingPermissionsUser(data: { userId:number , permissionId:number[] }){
        
        const createData = data.permissionId.map( permissionsId => ({
            userId:data.userId ,
            permissionsId ,
            status:1 ,
            createdAt: new Date,
            updatedAt: new Date
        }));
        return await this.prisma.userPermissions.createMany({
            data: createData,
            skipDuplicates: true, // para evitar errores si ya existe esa relación
        });
    }


    async validationRolesPermissions(data:any){
        return await this.prisma.user.findUnique({
            where:{id:data.userId},
            include: {
                rols:{
                    include:{
                        rol:{
                            include:{
                                permissions:{
                                    where:{status:1},
                                    include:{
                                        permission:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
    
    async unsubcriptionPermissionsUser(data:any){

    }
}