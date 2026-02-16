import { Module , forwardRef} from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { RefreshJwtStrategy } from "./refresh-jwt.strategy";
import { AuthService } from "./auth.service";
import { ConfigModule , ConfigService } from "@nestjs/config";
import { PermissionsGuard } from "./permissions.guard";
import { UserModule } from "src/modules/user/interfaces/user.module";

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        forwardRef(() => UserModule),  
        JwtModule.registerAsync({
            imports:[ ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' } // Adjust the expiration time as needed
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy , PermissionsGuard , RefreshJwtStrategy ],
    exports: [AuthService],
})
export class AuthModule {}