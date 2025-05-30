import { ID , InputType , ObjectType , Field} from "@nestjs/graphql";

@InputType()
export class createProviderInpu{
    @Field()
    name: string
   
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
export class providerData {
    @Field(() => ID)
    id: number

    @Field()
    name: string

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
export class createProviderOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(() => providerData ,{nullable:true} )
    createDataProvider: providerData | null        
}

