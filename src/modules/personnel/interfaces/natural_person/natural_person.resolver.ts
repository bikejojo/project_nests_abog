import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { Natural_Person } from "../../entities/natural_person.entity";
import { createNaturalPersonInput , createNaturalPersonOutPut } from "../../domain/dto/natural_person/create-natural_person.input";
import { deleteNaturalPersonInput , deleteNaturalPersonOutPut } from "../../domain/dto/natural_person/delete-natural_person.input";
import { updateNaturalPersonInput , updateNaturalPersonOutPut } from "../../domain/dto/natural_person/update-natural_person.input";
import { NaturalPersonUseCase } from "../../domain/services/natural_person.use-case";

@Resolver(()=> Natural_Person)
export class NaturalPersonResolver {
    constructor(
        private readonly naturalPersonUseCase:NaturalPersonUseCase
    ){}

    @Mutation(()=> createNaturalPersonOutPut)
    async createPersonNatural(@Args('data') data:createNaturalPersonInput ){
        return await this.naturalPersonUseCase.createdNaturalPerson(data);
    }

    @Mutation(()=> updateNaturalPersonOutPut)
    async updatePersonNatural(@Args('data') data:updateNaturalPersonInput){
        return await this.naturalPersonUseCase.updateNaturalPerson(data);
    }
}
