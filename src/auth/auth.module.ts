import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { ConfigModule , ConfigService } from "@nestjs/config";
import { PermissionsGuard } from "./permissions.guard";

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports:[ ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' } // Adjust the expiration time as needed
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy , PermissionsGuard ],
    exports: [AuthService],
})
export class AuthModule {}