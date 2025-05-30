import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { providerData } from "./create-provider.input";

@InputType()
export class deleteProviderInput {
    @Field()
    id: number
}

@ObjectType()
export class deleteProviderOutPut {
    @Field()
    message: string

    @Field()
    status: number
    
    @Field(() => providerData , { nullable: true})
    deleteProvider: providerData | null
}
