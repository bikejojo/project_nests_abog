import { Injectable } from "@nestjs/common";
import { LawyerRepository } from "src/modules/personnel/infraestructura/prisma/lawyer.repository";
import { JudgeRepository } from "src/modules/personnel/infraestructura/prisma/judge.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { ResponseContext } from "src/common/responses/response-context";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { response } from "src/common/enum/typeResp";

@Injectable()
export class ReportUseCase {
    constructor(){}

    private responseContext = new ResponseContext();

    async generatePDF(data:any){
        try{

        }catch(err){
            console.log('Fallas en GenPDF y son: ' + err.message);
            return this.responseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({name:'GenPDF', message:err.message , status:response.WARN})
        }
    }
}