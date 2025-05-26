import { Injectable , UnauthorizedException} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../../infraestructura/prisma/user.repository";
import { CreateUserInput } from "../dto/create-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { LoginUserInput } from "../dto/login-user.input";
import * as bcrypt from 'bcrypt';
import { RouterModule } from "@nestjs/core";

@Injectable()
export class UserUseCase {
    constructor(private prisma:PrismaService , private jwtService:JwtService) {}

    async login(data: LoginUserInput){
        const user = await this.prisma.user.findFirst({ where: { email: data.email }});
        if (!user || !(await bcrypt.compare(data.password , user.password ))){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        if(user.status === 0){
            throw new UnauthorizedException('Usuario inactivo');
        }

        return this.createToken(user);
    }

    private createToken(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: user.type,
            name: user.name
        }
        
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }
}