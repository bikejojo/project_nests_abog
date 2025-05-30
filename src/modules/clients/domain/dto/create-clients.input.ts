import { ObjectType , InputType , Field , ID  } from "@nestjs/graphql";

@InputType()
export class createClientsInput {
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
export class clientsData {
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
export class createClientsOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(() => clientsData ,{nullable:true})
    createClient: clientsData | null
}

