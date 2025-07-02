import { Field , ObjectType , InputType , ID } from "@nestjs/graphql";

@InputType()
export class updatelawyerInput {
    @Field(()=>ID)
    id:number

    @Field(()=> String , {nullable:true})
    firstName: string

    @Field(()=> String , {nullable:true})
    lastName: string

    @Field(()=> String , {nullable:true})
    phone: string

    @Field(()=> String , {nullable:true})
    address: string

    @Field(()=> Boolean , {nullable:true})
    isFiscal: boolean | null 

    @Field(()=> Boolean , {nullable:true})
    isIntern: boolean | null

}

@ObjectType()
export class updateLawyerData {
    @Field(()=>ID)
    id:number
}
@ObjectType()
export class updateLawyerOutPut {
    @Field()
    message: string

    @Field()
    status:number

    @Field(()=>updateLawyerData , {nullable:true })
    lawyerData?:updateLawyerData | null
    
}