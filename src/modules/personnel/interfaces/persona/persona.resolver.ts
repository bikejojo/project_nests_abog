import { Resolver , Mutation , Args , Query } from "@nestjs/graphql";
import { Persona } from "../../entities/persona.entity";
import { create_person_input , persLawUserOutPut } from "../../domain/dto/persona/create-persona.input";
import { personaUseCase } from "../../domain/services/persona.use-case";

@Resolver(() => Persona )
export class PersonaResolver {
    constructor(
        private readonly personaUseCase:personaUseCase
    ){}
    
}