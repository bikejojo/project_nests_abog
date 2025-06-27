import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/entities/user.entity";
import { JwtPayloadUser } from "./jwt-payload.dto";
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    async generateToken(user: JwtPayloadUser ): Promise<{ token: string }>{
        const payload = {
            sub:user.id,
            email: user.email,
            //roles: user.rols
            modules: user.modules ,
            menus: user.menus ,
            permissions: user.permissions
        }

        //console.log('c',payload)
        return {
            token: this.jwtService.sign(payload)
        }
    }
}