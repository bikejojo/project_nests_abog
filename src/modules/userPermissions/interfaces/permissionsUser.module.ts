import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PermissionsRepository } from "src/modules/permissions/infraestructura/permissions.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PermissionsUserUseCase } from "../domain/service/permissionUser.use-case";
import { PermissionsUserRepository } from "../infraestructura/prisma/permissionsUser.repository";
import { PermissionsModule } from "src/modules/permissions/interfaces/permissions.module";
import { UserModule } from "src/modules/user/interfaces/user.module";
import { permissionsUserResolver } from "./permissionsUser.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [
    AuthModule ,
    PermissionsModule,
    UserModule,
    JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{expiresIn:'1h'}
    })
  ],
  providers: [
    permissionsUserResolver,
    PermissionsUserRepository,
    PermissionsUserUseCase ,
    PrismaService,
  ],
  exports: [
    PermissionsUserUseCase,
    PermissionsUserRepository
  ],
})

export class PermissionsUserModule{}