import { Resolver , Mutation , Args , Query } from "@nestjs/graphql";
import { Persona } from "../../entities/persona.entity";

import { personaUseCase } from "../../domain/services/persona.use-case";

@Resolver(() => Persona )
export class PersonaResolver {
    constructor(
        private readonly personaUseCase:personaUseCase
    ){}
    
}