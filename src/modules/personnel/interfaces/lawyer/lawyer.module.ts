import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/prisma/prisma.service";
import { LawyerUseCase } from "../../domain/services/lawyer.lawyer-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { UserModule } from "src/modules/user/interfaces/user.module";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer/lawyer.repository";
import { LawyerResolver } from "./lawyer.resolver";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";

@Module({
  imports: [
        AuthModule,
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' } // Adjust the expiration time as needed
        })
    ],
    providers: [
        LawyerRepository,
        LawyerUseCase,
        LawyerResolver,
        PrismaService,
        UserRepository
    ],
    exports: [
        LawyerUseCase,
        LawyerRepository
    ],
})

export class LawyerModule {}