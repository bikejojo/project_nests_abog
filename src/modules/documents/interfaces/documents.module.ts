import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/constants";
//import { CityRepository } from "../infraestructura/prisma/city.repository";
import { documentsUseCase } from "../domain/services/documents.use-case";
import { documentsResolver } from "./documents.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { filesService } from "../domain/services/files.services";
import { ValidatorFilesService } from "../domain/services/validatorFiles.services";

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' } // Adjust the expiration time as needed
    })
  ],
  providers: [
    documentsResolver,
    documentsUseCase,
    PrismaService,
    filesService,
    ValidatorFilesService,
  ],
  exports: [
    documentsUseCase ,

  ],
})

export class DocumentsModule{}