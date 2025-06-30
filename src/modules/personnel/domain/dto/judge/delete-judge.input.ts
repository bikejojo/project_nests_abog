import { ObjectType , InputType , ID , Field } from "@nestjs/graphql";

@InputType()
export class deleteJudgeInput {
    @Field( ()=>ID )
    id:number

}


@ObjectType()
export class deleteJudgeOutPut {

    @Field()
    message:string

    @Field()
    status:number

}