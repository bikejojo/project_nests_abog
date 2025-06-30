import { Args , Mutation , Query , Resolver } from "@nestjs/graphql";
import { createLegalEntityInput , createLegalEntityOutPut } from "../../domain/dto/legal_entity/create-legal_entity.input";
import { Legal_Entity } from "../../entities/legal_entity.entity";
import { LegalEntityUseCase } from "../../domain/services/legal_entity.use-case";
import { deleteLegalEntityOutPut , deleteLegalEntityInput} from "../../domain/dto/legal_entity/delete-legal_entity.input";

@Resolver(()=>Legal_Entity)
export class LegalEntityResolver {
    constructor(
        private readonly legalEntityUseCase: LegalEntityUseCase
    ){}

    @Mutation(()=> createLegalEntityOutPut)
    async createLegalEntity(@Args('data') data:createLegalEntityInput ){
        return await this.legalEntityUseCase.createLegalEntity(data);
    }
    
    @Mutation(()=> deleteLegalEntityOutPut)
    async deleteLegalEntity(@Args('data') data:deleteLegalEntityInput ){
        return await this.legalEntityUseCase.deleteLegalEntity(data);
    }
}
