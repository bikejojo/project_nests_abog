import { ObjectType , Field , ID  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";

@ObjectType()
export class allClientOutPut {
    @Field()
    message: string

    @Field()
    status: number
    
    @Field(()=>[clientsData],{nullable:true})
    allClients: clientsData[] | null
}

