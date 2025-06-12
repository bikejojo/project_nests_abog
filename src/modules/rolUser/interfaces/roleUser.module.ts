import { Module , forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { roleUserRepository } from "../infraestructura/roleUser.repository";
import { RolesRepository } from "src/modules/roles/infraestructura/roles.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { rolUserUseCase } from "../domain/service/rolUser.use-case";
import { RolesModule } from "src/modules/roles/interfaces/roles.module";
import { UserModule } from "src/modules/user/interfaces/user.module";
import { RolesUseCase } from "src/modules/roles/domain/service/roles.use-case";
import { RolesResolver } from "src/modules/roles/interfaces/roles.resolver";
import { UserUseCase } from "src/modules/user/domain/service/user.use-case";
import { UserResolver } from "src/modules/user/interfaces/user.resolver";
import { RoleUserResolver } from "./roleUser.resolver";
import { PersonModule } from "src/modules/personnel/interfaces/persona/persona.module";
import { LawyerModule } from "src/modules/personnel/interfaces/lawyer/lawyer.module";

@Module({
    imports:[
        forwardRef(() => PersonModule),
        forwardRef(()=>LawyerModule ),
        AuthModule,
        UserModule,
        RolesModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions:{expiresIn:'1h'}
        })
    ],
    providers:[
        RolesRepository,
        RolesUseCase,
        RolesResolver,
        UserRepository,
        UserUseCase,
        UserResolver,
        roleUserRepository,
        rolUserUseCase,
        RoleUserResolver,
        PrismaService
    ],
    exports:[
        rolUserUseCase , 
        roleUserRepository,
        RoleUserResolver,
    ],
})

export class RoleUserModule{}