import { ObjectType , InputType , Field , ID  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";

@InputType()
export class findIdClientInput {
    @Field()
    id: number
}

@ObjectType()
export class findIdClientOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>clientsData,{nullable:true})
    findClient: clientsData | null    
    
}


