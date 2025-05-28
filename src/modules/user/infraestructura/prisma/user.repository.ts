import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service"
import { CreateUserInput } from "../../domain/dto/create-user.input";
import { UpdateUserInput } from "../../domain/dto/update-user.input";
import { LoginUserInput } from "../../domain/dto/login-user.input";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    login(email:string) {
        return this.prisma.user.findFirst({where:{email}})
    }

    async saveToken(token: string, user: { id: number }) {
        return await this.prisma.user.update({
            where: { id: user.id },
            data: { token },
        });
    }

    async createUser(data:any){
        return await this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role,
                token: data.token,
                type: data.type,
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
}
