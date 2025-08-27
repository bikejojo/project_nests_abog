import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";
import { personData } from "../persona/create-persona.input";

@InputType()
export class createLegalEntityInput{
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
    NIT: string

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
    
    @Field({nullable:true})
    cityId: number
}

@ObjectType()
export class legalEntityData{
    @Field()
    id:number

    @Field({nullable:true})
    NIT: number

    @Field({nullable:true})
    companyName: string

    @Field({nullable:true})
    address: string
    
    @Field({nullable:true})
    registrationDate: Date

    @Field({nullable:true})
    legalRepresentive: string

    @Field({nullable:true})
    typeCompany:string 
}

@ObjectType()
export class legalEntityPerson {
    @Field(()=>personData,{nullable:true})
    personsData: personData | null

    @Field(()=>legalEntityData,{nullable:true})
    legalEntityDats:legalEntityData | null
}

@ObjectType()
export class createLegalEntityOutPut{
    @Field()
    message:string

    @Field()
    status: number
    //@Field(()=>legalEntityPerson , {nullable:true})
    //legalEntityDatas: legalEntityPerson | null
    @Field(()=>legalEntityPerson , {nullable:true})
    response?: legalEntityPerson | null
}