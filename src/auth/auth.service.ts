import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/entities/user.entity";
import { JwtPayloadUser } from "./jwt-payload.dto";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository
    ) {}
    async generateToken(user: JwtPayloadUser ): Promise<{ token: string , refreshToken:string}>{
        const payload = {
            sub:user.id,
            email: user.email,
            //roles: user.rols
            modules: user.moduleUser ,
            menus: user.menuUser ,
            permissions: user.permissionsUser,
            type:'access'
        }

        const refreshPayload = {
            sub: user.id,
            id: user.id,
            type: 'refresh' // Importante: marcar como refresh token
        };

        return {
            token: this.jwtService.sign(payload,{
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: '3min'
            }),
            refreshToken: this.jwtService.sign(refreshPayload,{
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d'
            })
        }
    }

    async refreshAccessToken(refreshToken: string): Promise<{ token: string, refreshToken: string }> {
        try {
            // Verificar el refresh token
            const decoded = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET')
            });

            if (decoded.type !== "refresh") {
                throw new UnauthorizedException('Invalid token type');
            }

            // Aquí deberías obtener el usuario de la base de datos
            // para asegurarte de que aún existe y está activo
            const user = await this.getUserById(decoded.sub);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return this.generateToken(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async getUserById(userId:number) {
        return this.userRepository.findIdUserContent({id:userId});
    }
}