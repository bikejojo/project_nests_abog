import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service"
import { CreateUserInput } from "../../domain/dto/create-user.input";
import { UpdateUserInput } from "../../domain/dto/update-user.input";
import { LoginUserInput } from "../../domain/dto/login-user.input";
import { Token } from "graphql";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async login(email:string) {
        return await this.prisma.user.findFirst({where:{email},include:{rols:{include:{rol:true}}}})
    }

    async logout(userId:number){
        return await this.prisma.user.update({where:{id:userId}, data:{ token:''}})
    }

    async saveToken(token: string, user: { id: number }) {
        return await this.prisma.user.update({
            where: { id: user.id },
            data: { token }, //---- cambios yayaya
        });
    }

    async createUser(data:any){
        return await this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                //role: data.role,
                token: data.token,
                isActive: data.isActive,
                status: data.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
    }

    async deleteUserFind(data:any){
        return await this.prisma.user.update({
            where:{id:data},
            data: {
                status: 0
            }
        })
    }


    async findIdUsers(data:any){
        return await this.prisma.user.findFirst({
            where:{id:data.id}
        })
    }
    
}
