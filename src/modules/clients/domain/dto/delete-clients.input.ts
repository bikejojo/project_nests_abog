import { ObjectType , InputType , Field , ID, Int  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";


@InputType()
export class deleteClientInput {
    @Field(()=>Int, {description:'Identificador unico del cliente'})
    id: number
}

@ObjectType()
export class deleteClientOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>clientsData, {nullable:true})
    deleteClient: clientsData | null   
    
}

