import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { Lawyer } from "../../entities/lawyer.entity";
import { createLawyerInput , createLawyerOutPut } from "../../domain/dto/lawyer/create-lawyer.input";
import { LawyerUseCase } from "../../domain/services/lawyer.use-case";
import { allStatusPersLawyerOutPut } from "../../domain/dto/persona/allStatus-persona.input";

@Resolver(()=> Lawyer)
export class LawyerResolver {
    constructor(
        private readonly lawyerUseCase:LawyerUseCase
    ){}

    @Mutation(()=>createLawyerOutPut)
    async createLawyerPer(@Args('data') data:createLawyerInput ){
        return await this.lawyerUseCase.createLawyer(data);
    }
    
    @Query(()=>allStatusPersLawyerOutPut)
    async allLawyersStatus(){
        return await this.lawyerUseCase.allLawyerStatus();
    }
}
