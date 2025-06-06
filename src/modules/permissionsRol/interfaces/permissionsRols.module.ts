import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PermissionRolRepository } from "../infraestructura/permissionRol.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PermissionsRolsUseCase } from "../domain/service/PermissionsRol.use-case";
import { PermisssionsRolsResolver } from "./permissionsRols.resolver";
import { PermissionsModule } from "src/modules/permissions/interfaces/permissions.module";
import { RolesModule } from "src/modules/roles/interfaces/roles.module";

@Module({
  imports: [
    AuthModule , 
    PermissionsModule,
    RolesModule,
    JwtModule.register({
        secret: jwtConstants.secret , 
        signOptions: {expiresIn:'1h'}
    })
  ],
  providers: [
    PermissionsRolsUseCase , 
    PermissionRolRepository , 
    PermisssionsRolsResolver , 
    PrismaService, 
  ],
  exports: [
    PermissionsRolsUseCase ,
    PermissionRolRepository,
  ],
})

export class PermissionsRolsModule{}