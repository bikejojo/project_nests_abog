import { ObjectType , InputType , ID , Field } from "@nestjs/graphql";

@InputType()
export class inactiveJudgeInput {
    
    @Field(()=>ID)
    id:number
    
    @Field(()=> Boolean , {nullable:true})
    isActive: boolean

}

@ObjectType()
export class inactiveJudgeOutPut {
    @Field()
    message:string

    @Field()
    status: number


}