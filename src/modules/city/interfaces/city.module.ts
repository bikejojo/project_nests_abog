import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/constants";
import { CityRepository } from "../infraestructura/prisma/city.repository";
import { CityUseCase } from "../domain/services/city.use-case";
import { CityResolver } from "./city.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [
    AuthModule ,
    JwtModule.register({
        secret: jwtConstants.secret ,
        signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [
    CityRepository,
    CityUseCase ,
    CityResolver ,
    PrismaService
  ],
  exports: [
    CityRepository ,
    CityUseCase
  ],
})

export class CityModule{}