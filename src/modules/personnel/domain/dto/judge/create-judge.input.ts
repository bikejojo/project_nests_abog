import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

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
    address: string

    @Field({nullable:true})
    registrationDate: Date
    
}

@ObjectType()
export class judgeData{
    @Field()
    id:number

    @Field()
    ci:string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    phone: string

    @Field()
    address: string

    @Field()
    registrationDate: Date
    
}

@ObjectType()
export class createJudgeOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> judgeData , {nullable:true})
    judgeDats: judgeData | null
}
