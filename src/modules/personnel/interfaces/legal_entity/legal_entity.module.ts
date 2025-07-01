import { forwardRef , Module } from "@nestjs/common";
import { LegalEntityRepository } from "../../infraestructura/prisma/legal_entity.repository";
import { AuthModule } from "src/auth/auth.module";
import { LegalEntityUseCase } from "../../domain/services/legal_entity.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { PersonModule } from "../persona/persona.module";
import { LegalEntityResolver } from "./legal_entity.resolver";
import { NaturalPersonRepository } from "../../infraestructura/prisma/natural_person.repository";
import { NaturalPersonUseCase } from "../../domain/services/natural_person.use-case";
import { NaturalPersonResolver } from "../natural_person/natural_person.resolver";

@Module({
  imports: [
    AuthModule ,
    forwardRef(()=> PersonModule ) ,
    JwtModule.register({
        secret: jwtConstants.secret , 
        signOptions: {expiresIn:'1h'}
    })
  ],
  providers: [
    NaturalPersonRepository,
    NaturalPersonUseCase,
    NaturalPersonResolver,
    PrismaService
  ],
  exports: [
    NaturalPersonRepository ,
    NaturalPersonUseCase
  ],
})

export class LegalEntityModule{}