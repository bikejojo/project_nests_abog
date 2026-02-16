import { Module } from "@nestjs/common";
import { branchOfficeList, BranchOfficeUseCase } from "../domain/service/branchOffice.use-case";
import { BranchOfficeRepository } from "../infraestructura/prisma/branchOffice.repository";
import { branchOfficeResolver } from "./branchOffice.resolver";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [
    AuthModule ,
    JwtModule.register({
        secret:jwtConstants.secret ,
        signOptions: {expiresIn:'1h'}
    })
  ],
  providers: [
    PrismaService ,
    branchOfficeResolver,
    BranchOfficeRepository,
    BranchOfficeUseCase,
    branchOfficeList,
  ],
  exports: [
    BranchOfficeUseCase ,
    BranchOfficeRepository
  ],
})

export class BranchOfficeModule{}