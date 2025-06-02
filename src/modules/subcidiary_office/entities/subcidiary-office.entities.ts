import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class subcidiary_office {
    @Field(()=>ID)
    id:number

    @Field()
    name: string

    @Field()
    address: string

    @Field()
    status: number

    @Field()
    phone:string

    @Field()
    openingDate: Date

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
        
}