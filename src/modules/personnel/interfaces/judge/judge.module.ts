import { forwardRef , Module } from "@nestjs/common";
import { JudgeRepository } from "../../infraestructura/prisma/judge.repository";
import { AuthModule } from "src/auth/auth.module";
import { JudgeUseCase } from "../../domain/services/judge.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { PersonModule } from "../persona/persona.module";
import { JudgeResolver } from "./judge.resolver";

@Module({
  imports: [
    AuthModule ,
    forwardRef(()=> PersonModule),
    JwtModule.register({
        secret: jwtConstants.secret ,
        signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [
    JudgeRepository ,
    JudgeUseCase ,
    JudgeResolver ,
    PrismaService ,
  ],
  exports: [
    JudgeRepository ,
    JudgeUseCase
  ],
})

export class JudgeModule{}