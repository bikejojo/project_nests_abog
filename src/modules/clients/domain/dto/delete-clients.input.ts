import { ObjectType , InputType , Field , ID  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";


@InputType()
export class deleteClientInput {
    @Field()
    id: number
}

@ObjectType()
export class daleteClientOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>clientsData, {nullable:true})
    deleteClient: clientsData | null   
    
}

