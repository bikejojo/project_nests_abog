import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { Lawyer } from "../../entities/lawyer.entity";
import { createLawyerInput , createLawyerOutPut } from "../../domain/dto/lawyer/create-lawyer.input";
import { LawyerUseCase } from "../../domain/services/lawyer.use-case";
import { allStatusPersLawyerOutPut } from "../../domain/dto/lawyer/allStatus-persona.input";
import { updatelawyerInput, updateLawyerOutPut } from "../../domain/dto/lawyer/update-lawyer.input";
import { deletedLawyerInput, deletedLawyerOutPut } from "../../domain/dto/lawyer/delete-lawyer.input";
import { deleteClientInput } from "src/modules/clients/domain/dto/delete-clients.input";
import { inactiveLawyerInput, inactiveLawyerOutPut } from "../../domain/dto/lawyer/Inactive-lawyer.input";

@Resolver(()=> Lawyer)
export class LawyerResolver {
    constructor(
        private readonly lawyerUseCase:LawyerUseCase
    ){}

    @Mutation(()=>createLawyerOutPut)
    async createLawyerPer(@Args('data') data:createLawyerInput ){
        return await this.lawyerUseCase.createLawyer(data);
    }

    @Mutation(()=>updateLawyerOutPut)
    async updatedLawyer(@Args('data') data:updatelawyerInput ){
        return await this.lawyerUseCase.updateLawyer(data);
    }
    
    
    @Mutation(()=>deletedLawyerOutPut)
    async deletedLawyer(@Args('data') data:deletedLawyerInput ){
        return await this.lawyerUseCase.deleteLawyerStatus(data)
    }

    @Mutation(()=>inactiveLawyerOutPut)
    async inactivedLawyer(@Args('data') data:inactiveLawyerInput ){
        return await this.lawyerUseCase.inactiveLawyer(data);
    }

    @Query(()=>allStatusPersLawyerOutPut)
    async allLawyersStatus(){
        return await this.lawyerUseCase.allLawyerStatus();
    }

    @Query(()=>allStatusPersLawyerOutPut)
    async allActiveStatusLawyer(){
        return await this.lawyerUseCase.lawyerActStat();
    }

    @Query(()=>allStatusPersLawyerOutPut)
    async allInactiveStatusLawyer(){
        return await this.lawyerUseCase.lawyerInactStat();
    }
}
