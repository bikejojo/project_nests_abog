import { Resolver , Mutation ,  Args , Query} from "@nestjs/graphql";
import { Clients } from "../entities/clients.entities";
import { ClientsUseCase } from "../domain/service/clients.use-case";
import { createClientsInput, createClientsOutPut } from "../domain/dto/create-clients.input";
import { updateClientInput , updateClientOutPut } from "../domain/dto/update-clients.input";
import { deleteClientInput ,  deleteClientOutPut } from "../domain/dto/delete-clients.input";
import { findIdClientInput , findIdClientOutPut } from "../domain/dto/findId-clients.input";
import { allClientOutPut } from "../domain/dto/all-clients.input";

@Resolver(()=>Clients)
export class ClientsResolver {
    constructor(private readonly clientsUseCase:ClientsUseCase){}

    @Mutation(()=> createClientsOutPut)
    async createClients(@Args('data')data:createClientsInput ){
        return await this.clientsUseCase.createClient(data)
    }

    @Mutation(()=> updateClientOutPut)
    async updateClients(@Args('data') data:updateClientInput ){
        return await this.clientsUseCase.updateClient(data)
    }

    @Mutation(()=> deleteClientOutPut)
    async deleteClients(@Args('data') data:deleteClientInput){
        return await this.clientsUseCase.deleteClient(data)
    }

    @Query(()=>findIdClientOutPut)
    async findIdClients(@Args('data') data:findIdClientInput){
        return await this.clientsUseCase.findIdClient(data)
    }
    
    @Query(()=>allClientOutPut)
    async allClients(){
        return await this.clientsUseCase.allClient();
    }
}
