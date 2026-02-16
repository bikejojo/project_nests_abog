import { Module , forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ReportUseCase } from "../domain/services/reports.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";

import { ReportResolver } from "./reports.resolver";

@Module({
  imports: [
    AuthModule , 
    JwtModule.register({
        secret: jwtConstants.secret ,
        signOptions:{expiresIn:'1h'}
    })
  ],
  providers: [
    ReportUseCase ,
    ReportResolver ,
    PrismaService ,
  ],
  exports: [
    ReportUseCase,
    ReportResolver
  ],
})

export class ReportsModule{}