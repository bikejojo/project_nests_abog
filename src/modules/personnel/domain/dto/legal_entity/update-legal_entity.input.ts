import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class updateLegalEntityInput{
    
    @Field(()=>ID)
    id:number
    
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
    NIT: number

    @Field({nullable:true})
    companyName: string

    @Field({nullable:true})
    addressLE: string
    
    @Field({nullable:true})
    registrationDate: Date

    @Field({nullable:true})
    legalRepresentive: string

    @Field({nullable:true})
    typeCompany:string 
}

@ObjectType()
export class updateLegalEntityOutPut {
    @Field(()=>String , {nullable:true})
    message: string

    @Field()
    status: number
}