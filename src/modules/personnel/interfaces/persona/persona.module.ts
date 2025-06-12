    import { Module , forwardRef } from "@nestjs/common";
    import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
    import { AuthModule } from "src/auth/auth.module";
    import { personaUseCase } from "../../domain/services/persona.use-case";
    import { JwtModule } from "@nestjs/jwt";
    import { jwtConstants } from "src/auth/constants";
    import { PrismaService } from "src/prisma/prisma.service";
    import { UserModule } from "src/modules/user/interfaces/user.module";
    import { LawyerModule } from "../lawyer/lawyer.module";
import { PersonaResolver } from "./persona.resolver";

    @Module({
    imports: [
        AuthModule ,
        UserModule ,
        forwardRef(()=>LawyerModule),
        JwtModule.register({
            secret: jwtConstants.secret ,
            signOptions: {expiresIn:'1h'}
        })
    ],
    providers: [
        PersonRepository ,
        personaUseCase ,
        PersonaResolver ,
        PrismaService ,
    ],
    exports: [
        personaUseCase ,
        PersonRepository
    ],
})
export class PersonModule{}