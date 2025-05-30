import { Resolver , Mutation ,  Args , Query} from "@nestjs/graphql";
import { Provider } from "../entities/provider.entities";
import { ProviderUseCase } from "../domain/service/provider.use-case";
import { createProviderInpu, createProviderOutPut } from "../domain/dto/create-provider.input";
import { updateProviderInput, updateProviderOutPut } from "../domain/dto/update-provider.input";
import { deleteProviderInput, deleteProviderOutPut } from "../domain/dto/delete-provider.input";

@Resolver(()=> Provider)
export class ProviderResolver {
    constructor(private readonly providerUseCase: ProviderUseCase){}

    @Mutation(()=>createProviderOutPut)
    async createProvider(@Args('data') data: createProviderInpu){
        return await this.providerUseCase.createProvider(data);
    }

    @Mutation(()=>updateProviderOutPut)
    async updateProvider(@Args('data')data: updateProviderInput){
        return await this.providerUseCase.updateProvider(data)
    }

    @Mutation(()=>deleteProviderOutPut)
    async deleteProvider(@Args('data')data: deleteProviderInput ){
        return await this.providerUseCase.deleteProvider(data)
    }
    

    @Query(()=> String)
    sayHello():string {
        return 'HELLO';
    }
}
