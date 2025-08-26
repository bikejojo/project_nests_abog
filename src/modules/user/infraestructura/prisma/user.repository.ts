import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service"
import { Prisma, User as PrismaUser } from '@prisma/client';
import { LoginUserInput } from "../../domain/dto/login-user.input";
import { Token } from "graphql";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async login(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async logout(userId:number){
        return await this.prisma.user.update({where:{id:userId}, data:{ token:''}})
    }

    async saveToken(token: string, reftoken: string ,user: { id: number }) {
        return await this.prisma.user.update({
            where: { id: user.id },
            data: { token , reftoken }, //---- cambios yayaya
        });
    }

    async createUser(data: any, tx?: Prisma.TransactionClient){
        const prisma = tx || this.prisma;
        return await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                token: data.token,
                type: data.type,
                isActive: data.isActive,
                status: data.status,
                roleId: data.roleId,
            }
        })
    }

    async deleteUserFind( data:any,tx?: Prisma.TransactionClient){
        const prisma = tx || this.prisma;
        return await prisma.user.update({
            where:{
                id:data.id
            },
            data: {
                status: 0
            }
        })
    }


    async findIdUsers(data:any){
        return await this.prisma.user.findUnique({
            where:{id:data.id}
        })
    }

    async findModuleUsersId(data:any){
        return await this.prisma.moduleUser.findMany({
            where:{
                userId:data.userId
            },
            include: {
                modules:true
            }
        })
    }

    async findMenuUserId(data:any){
        return await this.prisma.menuUser.findMany({
            where: {
                userId: data.userId
            },
            include:{
                menu:true
            }
        })
    }
    
    async findPermissonsUserId(data:any){
        return await this.prisma.permissionsUser.findMany({
            where:{
                userId:data.userId
            },
            include:{
                permissions:true
            }
        })
    }

    async findIdUserContent(data:any){
        return await this.prisma.user.findUnique({
            where:{
                id:data.id
            },
            select: { 
                id: true, 
                email: true,  
                password: true, 
                token: true,
                type: true, 
                isActive: true,
                status: true,
                roleId: true,
                moduleUser: { select: { modules: { select: { id: true, name: true } } } },
                menuUser: { select: { menu: { select: { id: true, name: true } } } },
                permissionsUser: { select: { permissions: { select: { id: true, name: true } } } },
                persona: true
            }
        });
    }

    async updateUser(data: any, tx?: Prisma.TransactionClient) {
        const prisma = tx || this.prisma;
        return await prisma.user.update({
            where: { id: data.id },
            data: {
                email: data.email,
                password: data.password,
                type: data.type,
                isActive: data.isActive,
                status: data.status,
            }
        });
    }
    
    async createLog(data:any,tx?:Prisma.TransactionClient){
        const prisma  = tx || this.prisma;
        return await prisma.auth_log.create({
            data: {
                userId: data.userId ,
                message: data.message ,
                action: data.action ,
                origin: data.origin ,
                timestamp: data.timestamp ,
                ipAddress: data.ipAddress ,
            }
        })
    }

}
