import { forwardRef, Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ClientsResolver } from "./clients.resolver";
import { ClientsUseCase, ClientsUseList } from "../domain/service/clients.use-case";
import { Clients } from "../entities/clients.entities";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/constants";
import { JwtModule } from "@nestjs/jwt";
import { PersonModule } from "src/modules/personnel/interfaces/persona/persona.module";
import { ClientRepository } from "../infraestructura/prisma/clients.repository";

@Module({
  imports: [
    AuthModule ,
    forwardRef(()=>PersonModule),
    JwtModule.register({
      secret: jwtConstants.secret ,
      signOptions: {expiresIn: '1d'}
    })
  ],
  providers: [
    PrismaService ,
    ClientsResolver ,
    ClientsUseCase ,
    ClientsUseList,
    ClientRepository , 
    Clients
  ],
  exports: [
    ClientsUseCase ,
    ClientsUseList,
    ClientRepository ,
  ],
})

export class clientsModule {}