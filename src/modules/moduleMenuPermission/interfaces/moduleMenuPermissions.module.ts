import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { ModuleMenuPermissionsRepository } from "../infraestructura/prisma/moduleMenuPermissions.repository";
import { ModuleMenuPermissionList, ModuleMenuPermissionsUseCase } from "../domain/services/moduleMenuPermissions.use-case";
import { ModuleMenuPermissionResolver } from "./moduleMenuPermission.resolver";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [
    ModuleMenuPermissionResolver,
    ModuleMenuPermissionsUseCase,
    ModuleMenuPermissionList,
    ModuleMenuPermissionsRepository,
    UserRepository ,
    PrismaService
  ],
  exports: [
    ModuleMenuPermissionsUseCase,
    ModuleMenuPermissionsRepository,
    UserRepository,
  ],
})

export class ModuleMenuPermissionModule {}