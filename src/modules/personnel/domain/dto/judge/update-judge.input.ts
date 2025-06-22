import { InputType , ObjectType , Field  } from "@nestjs/graphql";

@InputType()
export class updateJudgeInput{
    @Field()
    id: number

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
export class judgeData {
    
    @Field()
    id: number

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

    @Field({nullable:true})
    cityId: number
}

@ObjectType()
export class deletedJudgeData {
    @Field()  
    message:string

    @Field()
    status: number

    @Field(()=> judgeData,{nullable:true})
    judgeData:judgeData |null
}
