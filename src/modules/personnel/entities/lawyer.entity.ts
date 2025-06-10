import { Field , ID , ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Lawyer {
    @Field(()=>ID)
    id:number

    @Field()
    registrationDate: Date

    @Field()
    isActive: boolean

    @Field()
    isFiscal:boolean

    @Field()
    isIntern: boolean

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt : Date

    @Field()
    personId: number
}
