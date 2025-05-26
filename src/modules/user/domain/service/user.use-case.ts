import { Injectable , UnauthorizedException} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../../infraestructura/prisma/user.repository";
import { CreateUserInput } from "../dto/create-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserInput } from "../dto/login-user.input";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../../../../auth/auth.service";
import { RouterModule } from "@nestjs/core";

@Injectable()
export class UserUseCase {
    constructor(
        private prisma:PrismaService , 
        private authService: AuthService ,
    ) {}

    async login(data: LoginUserInput){
        const user = await this.prisma.user.findFirst({ where: { email: data.email }});
        if (!user || !(await bcrypt.compare(data.password , user.password ))){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        if(user.status === 0){
            throw new UnauthorizedException('Usuario inactivo');
        }

        return this.authService.generateToken(user);
    }

    
}