import { ObjectType , Field , ID, Int  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";

@ObjectType()
export class allClientOutPut {
    @Field(()=>String)
    message: string

    @Field(()=>Int)
    status: number
    
    @Field(()=>[clientsData],{nullable:true})
    allClients: clientsData[] | null
}

