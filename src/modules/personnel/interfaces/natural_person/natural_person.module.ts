import { ForwardReference , Module } from "@nestjs/common";
import { NaturalPersonRepository } from "../../infraestructura/prisma/natural_person.repository";
import { AuthModule } from "src/auth/auth.module";
import { NaturalPersonUseCase } from "../../domain/services/natural_person.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { PersonModule } from "../persona/persona.module";
import { NaturalPersonResolver } from "./natural_person.resolver";

@Module({
  imports: [],
  providers: [],
  exports: [],
})

export class NaturalPersonModule{}