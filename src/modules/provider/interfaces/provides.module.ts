import { Module } from "@nestjs/common";
import { ProviderRepository } from "../infraestructur/prisma/provider.repository";
import { AuthModule } from "src/auth/auth.module";
import { ProviderUseCase } from "../domain/service/provider.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'},
    }),
  ],
  providers: [
    ProviderRepository,
    ProviderUseCase,
    PrismaService,
  ],
  exports: [
    ProviderUseCase,
    ProviderRepository
  ],
})
export class providesModule {}