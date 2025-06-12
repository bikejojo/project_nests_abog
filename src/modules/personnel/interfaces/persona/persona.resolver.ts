import { Resolver , Mutation , Args , Query } from "@nestjs/graphql";
import { Persona } from "../../entities/persona.entity";
import { create_person_input , persLawUserOutPut } from "../../domain/dto/persona/create-persona.input";
import { personaUseCase } from "../../domain/services/persona.use-case";

@Resolver(() => Persona )
export class PersonaResolver {
    constructor(
        private readonly personaUseCase:personaUseCase
    ){}

    @Mutation(()=>persLawUserOutPut)
    async createUserPersLawyer(@Args('data') data:create_person_input ){
        return await this.personaUseCase.createPersonLawyer(data);
    }
    
}