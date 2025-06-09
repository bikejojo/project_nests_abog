import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PermissionsRepository {
    constructor(private readonly prisma:PrismaService){}

    async createdPermissions(data:any){
        return await this.prisma.permissions.create({
            data:{
                description:data.description,
                status:data.status,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            }
        })
    }

    async findPermission(data:any){
        return await this.prisma.permissions.findFirst({
            where:{id:data.id}
        })
    }

    async arrayFindPermissions(permissionsId:number[]){
        const existinfPermissions = await this.prisma.permissions.findMany({
            where:{
                id: { in:permissionsId },
                status: 1
            },
            select:{id:true}
        });

        return existinfPermissions.map(p=>p.id);
    }
}