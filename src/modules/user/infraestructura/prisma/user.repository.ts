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
}
