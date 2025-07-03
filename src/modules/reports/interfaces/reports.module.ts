import { Module , forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ReportUseCase } from "../domain/services/reports.use-case";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { JudgeModule } from "src/modules/personnel/interfaces/judge/judge.module";
import { LawyerModule } from "src/modules/personnel/interfaces/lawyer/lawyer.module";
import { ReportResolver } from "./reports.resolver";

@Module({
  imports: [
    AuthModule , 
    forwardRef(()=>JudgeModule),
    forwardRef(()=>LawyerModule),
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