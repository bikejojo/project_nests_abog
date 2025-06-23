import { ObjectType , InputType , ID , Field } from "@nestjs/graphql";

@InputType()
export class deleteJudgeInput {
    @Field( ()=>ID )
    id:number

    @Field({nullable:true})
    status:number
}


@ObjectType()
export class deleteJudgeOutPut {

    @Field()
    message:string

    @Field()
    status:number


}