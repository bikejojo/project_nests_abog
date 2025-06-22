import { Module , forwardRef} from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "../infraestructura/prisma/user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { UserUseCase } from "../domain/service/user.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PersonModule } from "src/modules/personnel/interfaces/persona/persona.module";
import { LawyerModule } from "src/modules/personnel/interfaces/lawyer/lawyer.module";
@Module({
  imports: [
    AuthModule,
    forwardRef(() => PersonModule),
     forwardRef(() => LawyerModule),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' } // Adjust the expiration time as needed
    })
  ],
  providers: [
    UserResolver,
    UserRepository,
    PrismaService,
    UserUseCase
  ],
  exports: [
    UserUseCase,
    UserRepository
  ]
})

export class UserModule {}