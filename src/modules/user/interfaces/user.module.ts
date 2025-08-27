import { Module , forwardRef} from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "../infraestructura/prisma/user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { actionUserPerson, UserUseCase } from "../domain/service/user.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PersonModule } from "src/modules/personnel/interfaces/persona/persona.module";
import { PersonRepository } from "src/modules/personnel/infraestructura/prisma/persona.repository";
import { ModuleMenuPermissionsRepository } from "src/modules/moduleMenuPermission/infraestructura/prisma/moduleMenuPermissions.repository";
@Module({
  imports: [
    //AuthModule,
    forwardRef(() => AuthModule),
    //forwardRef(() => PersonModule),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' } // Adjust the expiration time as needed
    })
  ],
  providers: [
    UserResolver,
    UserRepository,
    ModuleMenuPermissionsRepository,
    PrismaService,
    UserUseCase,
    actionUserPerson,
    PersonRepository
  ],
  exports: [
    UserUseCase,
    UserRepository
  ]
})

export class UserModule {}