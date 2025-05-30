import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class Provider {
    @Field(()=> ID)
    id: number

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    NIT: string

    @Field()
    phone:  string

    @Field()
    email: string

    @Field()
    address: string

    @Field()
    typeProvider: string

    @Field()
    status: number

    @Field()
    isActive: boolean

    @Field()
    createAt: Date
    
    @Field()
    updateAt: Date
    
}
