import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { CompanyRepository } from "../../infraestructura/prisma/company/company.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CompanyUseCase } from "../../domain/services/company.company-case"
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { CompanyResolver } from "./company.resolver";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { UserModule } from "src/modules/user/interfaces/user.module";
import { AuthService } from "src/auth/auth.service";

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
        CompanyRepository,
        CompanyUseCase,
        CompanyResolver,
        PrismaService,
        UserRepository
    ],
    exports: [
        CompanyUseCase,
        CompanyRepository,
    ]
})

export class CompanyModule {}
