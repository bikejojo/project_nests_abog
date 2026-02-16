import { Args , Mutation , Query , Resolver } from "@nestjs/graphql";

import { Legal_Entity } from "../../entities/legal_entity.entity";
import { LegalEntityUseCase } from "../../domain/services/legal_entity.use-case";



@Resolver(()=>Legal_Entity)
export class LegalEntityResolver {
    constructor(
        private readonly legalEntityUseCase: LegalEntityUseCase
    ){}

    /*@Mutation(()=> createLegalEntityOutPut)
    async createLegalEntity(@Args('data') data:createLegalEntityInput ){
        return await this.legalEntityUseCase.createLegalEntity(data);
    }
    
    @Mutation(()=> updateLegalEntityOutPut)
    async updatedLegalEntity(@Args('data') data:updateLegalEntityInput ){
        return await this.legalEntityUseCase.updateLegalEntity(data)
    }

    @Mutation(()=> deleteLegalEntityOutPut)
    async deleteLegalEntity(@Args('data') data:deleteLegalEntityInput ){
        return await this.legalEntityUseCase.deleteLegalEntity(data);
    }*/
}
