import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class updateJudgeInput{
    @Field(()=>ID)
    id: number

    @Field({nullable:true})
    ci:string

    @Field({nullable:true})
    firstName: string

    @Field({nullable:true})
    lastName:string

    @Field({nullable:true})
    isActive:boolean

    @Field({nullable:true})
    isIntern:boolean

    @Field({nullable:true})
    phone: string
    
    @Field({nullable:true})
    address: string

    @Field({nullable:true})
    registrationDate: Date
    
    @Field({nullable:true})
    cityId:number

    @Field({nullable:true})
    description: string
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
export class updateJudgeOutPut {
    @Field()  
    message:string

    @Field()
    status: number

    @Field(()=> judgeData,{nullable:true})
    response?:judgeData |null
}
