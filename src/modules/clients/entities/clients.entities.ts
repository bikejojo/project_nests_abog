import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class Clients {
    @Field(()=> ID)
    Id: number

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    phone: string

    @Field()
    email: string

    @Field()
    NIT: string

    @Field()
    isActive: boolean

    @Field()
    status: number

    @Field()
    createAt: Date;

    @Field()
    updateAt: Date
    
}