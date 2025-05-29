import { Field , ObjectType } from "@nestjs/graphql";
import { providerData } from "./create-provider.input";

@ObjectType()
export class allProviderStatus {
    @Field()
    message: string

    @Field()
    status: number
    
    @Field(()=>[providerData] , {nullable:true})
    allProviders: providerData[] | null
    
}
