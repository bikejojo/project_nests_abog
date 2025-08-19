import { ObjectType , Field , ID, Int } from "@nestjs/graphql";

@ObjectType()
export class Branch_Office {
    @Field(()=>ID)
    id:number

    @Field()
    name: string

    @Field()
    address: string

    @Field(()=>String , {nullable:true})
    phone: string

    @Field(()=>Int , {nullable:true})
    status: number
}