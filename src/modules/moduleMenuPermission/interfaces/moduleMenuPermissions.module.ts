import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { ModuleMenuPermissionsRepository } from "../infraestructura/prisma/moduleMenuPermissions.repository";
import { ModuleMenuPermissionsUseCase } from "../domain/services/moduleMenuPermissions.use-case";
import { ModuleMenuPermissionResolver } from "./moduleMenuPermission.resolver";

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [
    ModuleMenuPermissionResolver,
    ModuleMenuPermissionsUseCase,
    ModuleMenuPermissionsRepository,
    PrismaService
  ],
  exports: [
    ModuleMenuPermissionsUseCase,
    ModuleMenuPermissionsRepository,
  ],
})

export class ModuleMenuPermissionModule {}