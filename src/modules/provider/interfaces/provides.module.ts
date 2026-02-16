import { forwardRef, Module } from "@nestjs/common";
import { ProviderRepository } from "../infraestructur/prisma/provider.repository";
import { AuthModule } from "src/auth/auth.module";
import { ProviderUseCase } from "../domain/service/provider.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { PersonModule } from "src/modules/personnel/interfaces/persona/persona.module";
import { ProviderResolver } from "./provides.resolver";
@Module({
  imports: [
    AuthModule,
    forwardRef(()=>PersonModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'},
    }),
  ],
  providers: [
    ProviderRepository,
    ProviderUseCase,
    ProviderResolver,
    PrismaService,
  ],
  exports: [
    ProviderUseCase,
    ProviderRepository
  ],
})
export class providesModule {}