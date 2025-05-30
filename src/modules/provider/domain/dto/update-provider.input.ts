import { ID , ObjectType , InputType , Field } from "@nestjs/graphql";
import { providerData } from "./create-provider.input";

@InputType()
export class updateProviderInput {
    @Field()
    id: number

    @Field()
    phone: string

    @Field()
    email: string
    
    @Field()
    NIT: string

    @Field()
    address: string
   
}

@ObjectType()
export class updateProviderOutPut {
    @Field()
    message: string

    @Field()
    status: number
    
    @Field(()=> providerData , {nullable:true})
    updateProvider: providerData | null 
    
}

