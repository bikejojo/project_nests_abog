import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../infraestructura/prisma/user.repository";
import { CreateUserInput } from "../dto/create-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserInput } from "../dto/login-user.input";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../../../../auth/auth.service";

@Injectable()
export class UserUseCase {
    constructor(
        private prisma:PrismaService , 
        private authService: AuthService ,
        private userRepository: UserRepository
    ) {}

    async login(data: LoginUserInput){
        const user = await this.userRepository.login(data.email);
        if(!user){
            //throw new UnauthorizedException('El usuario no existe');
            return {
                message: 'El usuario no existe',
                status: 401 ,
                user: null
            }
        }

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            //throw new UnauthorizedException('Credenciales inválidas');
            return {
                message: 'Credenciales inválidas',
                status: 401,
                user: null
            }
        }

        if(user.status === 0){
            //throw new UnauthorizedException('Usuario inactivo');
            return {
                message: 'Usuario inactivo',
                status: 401,
                user: null
            }
        }

        let jwtToken = await this.authService.generateToken(user);
        this.userRepository.saveToken(jwtToken.token , user );
        return {
            message: 'Inicio de sesión exitoso',
            status: 200,
            user: {
                name: user.name,
                email: user.email,
                type: user.type, // 1: empresa, 2: abogado, 3: admin
                token: jwtToken,
                role: user.role,
            },
        }
    }
    
}