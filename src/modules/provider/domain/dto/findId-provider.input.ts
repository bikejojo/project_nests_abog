import { ObjectType , InputType , Field  } from "@nestjs/graphql";
import { providerData } from "./create-provider.input";

@InputType()
export class findIdProvider {
    @Field()
    id: number
}

@ObjectType()
export class findProvider {
    @Field()    
    message: string

    @Field()
    status: number

    @Field(() => providerData , {nullable:true})
    findProvider:providerData | null
    
}
