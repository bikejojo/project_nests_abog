import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "../infraestructura/prisma/user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { UserUseCase } from "../domain/service/user.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: 'id' } // Adjust the expiration time as needed
    })
  ],
  providers: [
    UserResolver,
    UserRepository,
    PrismaService,
    UserUseCase
  ],
  exports: [UserUseCase]
})

export class UserModule {}