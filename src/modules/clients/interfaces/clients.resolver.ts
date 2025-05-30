import { Resolver , Mutation ,  Args , Query} from "@nestjs/graphql";
import { Clients } from "../entities/clients.entities";
import { ClientsUseCase } from "../domain/service/clients.use-case";
import { createClientsInput, createClientsOutPut } from "../domain/dto/create-clients.input";

@Resolver(()=>Clients)
export class ClientsRepository {
    constructor(private readonly clientsUseCase:ClientsUseCase){}

    @Mutation(()=> createClientsOutPut)
    async createClients(@Args('data')data:createClientsInput ){
        return await this.clientsUseCase.createClient(data)
    }

}
