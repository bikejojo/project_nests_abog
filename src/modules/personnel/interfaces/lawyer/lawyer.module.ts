import { forwardRef , Module } from "@nestjs/common";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import { AuthModule } from "src/auth/auth.module";
import { LawyerUseCase } from "../../domain/services/lawyer.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/modules/user/interfaces/user.module";
import { PersonModule } from "../persona/persona.module";

@Module({
  imports: [
    AuthModule ,
    UserModule ,
    forwardRef(()=> PersonModule ),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn:'1h'}
    })
  ],
  providers: [
    LawyerRepository,
    LawyerUseCase ,
    PrismaService,
  ],
  exports: [
    LawyerRepository ,
    LawyerUseCase ,
  ],
})

export class LawyerModule{}