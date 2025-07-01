import { InputType , ObjectType , Field , ID , Int } from "@nestjs/graphql";

@ObjectType()
export class allStatus {
    @Field(()=> ID)
    id: number

    @Field()
    fullName: string

    @Field()
    status: number

}

@ObjectType()
export class allStatusPersLawyerOutPut{
    @Field(() => String, { nullable: true })
    message: string

    @Field(()=> Int , {nullable:true})
    status: number

    @Field(() => [allStatus] , {nullable:true})
    response: allStatus[] | null
}