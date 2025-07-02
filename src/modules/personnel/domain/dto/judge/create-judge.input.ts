import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";
import { judgeData } from "./update-judge.input";

@InputType()
export class createJudgeInput{
    @Field({nullable:true})
    ci:string

    @Field({nullable:true})
    firstName: string

    @Field({nullable:true})
    lastName:string

    @Field({nullable:true})
    phone: string

    @Field({nullable:true})
    isActive: boolean

    @Field({nullable:true})
    isIntern: boolean
    
    @Field({nullable:true})
    address: string

    @Field({nullable:true})
    description: string

    @Field({nullable:true})
    registratioDate: Date
    
    @Field({nullable:true})
    cityId: number
}

@ObjectType()
export class createJudgeOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> judgeData , {nullable:true})
    response?: judgeData | null
}
