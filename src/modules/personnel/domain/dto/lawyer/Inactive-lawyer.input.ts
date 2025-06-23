import { InputType , Field , ObjectType , ID } from "@nestjs/graphql";

@InputType()
export class inactiveLawyerInput{
    @Field(() => ID)
    id: number

    @Field(()=> Boolean , {nullable:true})
    isActive: boolean
}

@ObjectType()
export class inactiveLawyerOutPut {
    @Field()
    message: string

    @Field()
    status: number

}