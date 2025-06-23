import { ObjectType , InputType , ID , Field } from "@nestjs/graphql";

@InputType()
export class inactiveJudgeInput {
    
    @Field(()=>ID)
    id:number
    
    @Field(()=> Boolean , {nullable:true})
    isActive: boolean

    @Field({nullable:true})
    status: number
}

@ObjectType()
export class inactiveJudgeOutPut {
    @Field()
    message:string

    @Field()
    status: number


}