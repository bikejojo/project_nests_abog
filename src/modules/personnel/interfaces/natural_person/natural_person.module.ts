import { forwardRef, ForwardReference , Module } from "@nestjs/common";
import { NaturalPersonRepository } from "../../infraestructura/prisma/natural_person.repository";
import { AuthModule } from "src/auth/auth.module";
import { NaturalPersonUseCase } from "../../domain/services/natural_person.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { PersonModule } from "../persona/persona.module";
import { NaturalPersonResolver } from "./natural_person.resolver";

@Module({
  imports: [
    AuthModule , 
    forwardRef(()=>PersonModule), 
    JwtModule.register({
      secret: jwtConstants.secret , 
      signOptions: {expiresIn:'1h'}
    })
  ],
  providers: [
    NaturalPersonRepository ,
    NaturalPersonUseCase ,
    NaturalPersonResolver ,
    PrismaService
  ],
  exports: [
    NaturalPersonRepository , 
    NaturalPersonUseCase
  ],
})

export class NaturalPersonModule{}