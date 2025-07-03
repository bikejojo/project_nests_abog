import { Query , Resolver , Args } from "@nestjs/graphql";
import { ReportUseCase } from "../domain/services/reports.use-case";
import { UseFilters , UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/authentification";
import { PermissionsGuard } from "src/auth/permissions.guard";
import { CheckAccess } from "src/common/decorator/permissions-user.decorator";
import { GraphqlForbiddenExceptionFilter } from "src/helper/Exception.Filter";
import { createReportInput, createReportOutPut } from "../domain/dto/create-reports.input";

export class ReportResolver {
    constructor(
        private readonly reportUseCase: ReportUseCase
    ){}

    @Query(()=>createReportOutPut)
    async reportPDF(@Args('data') data:createReportInput ){
        return this.reportUseCase.generatePDF(data);
    }
}