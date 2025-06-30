import { Injectable } from "@nestjs/common";
import { NaturalPersonRepository } from "../../infraestructura/prisma/natural_person.repository";
import { response } from "src/common/enum/typeResp";
import { status , tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";

@Injectable()
export class NaturalPersonUseCase{
    constructor(
        private readonly naturalPerson: NaturalPersonRepository
    ){}
    private ResponseContext = new ResponseContext()

    async createdNaturalPerson(data:any){
        try {

        }catch(err){
            console.log('Fallas en CrtNatPer y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'CrtNatPer' , message:err.message , status:response.WARN })
        }
    }

    async updateNaturalPerson(data:any){
        try {

        }catch(err){
            console.log('Fallas en UpdNatPer y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'UpdNatPer' , message:err.message , status:response.WARN })
        }
    }

    async deleteNaturalPerson(data:any){
        try {

        }catch(err){
            console.log('Fallas en delNatPer y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'delNatPer' , message:err.message , status:response.WARN })
        }
    }
}