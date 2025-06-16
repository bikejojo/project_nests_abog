import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/constants";
//import { CityRepository } from "../infraestructura/prisma/city.repository";
import { documentsUseCase } from "../domain/services/documents.use-case";
import { documentsResolver } from "./documents.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [],
  providers: [],
  exports: [],
})

export class DocumentsModule{}