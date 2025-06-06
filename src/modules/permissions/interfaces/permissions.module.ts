import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PermissionsRepository } from "../infraestructura/permissions.repository";
import { PermissionsResolver } from "./permissions.resolver";
import { PermissionsUseCase } from "../domain/service/permissions.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [
    AuthModule,
    PermissionsModule,
    JwtModule.register({
        secret: jwtConstants.secret ,
        signOptions: { expiresIn:'1h'}
    })
  ],
  providers: [
    PermissionsRepository ,
    PermissionsUseCase ,
    PermissionsResolver,
    PrismaService ,

  ],
  exports: [
    PermissionsUseCase , 
    PermissionsRepository
  ],
})

export class PermissionsModule{}