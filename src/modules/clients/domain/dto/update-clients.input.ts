import { ObjectType , InputType , Field , ID  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";

@InputType()
export class updateClientInput{
    @Field(()=> ID)
    id: number

    @Field()
    firtName: string

    @Field()
    lastName: string

    @Field()
    phone: string

    @Field()
    address: string

    @Field()
    NIT: string

}

@ObjectType()
export class updateClientOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>clientsData,{nullable:true})
    updateClient:clientsData | null
    
}
