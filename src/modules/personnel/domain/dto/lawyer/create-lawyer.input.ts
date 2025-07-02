import { ObjectType , Field , InputType , ID, Int  } from "@nestjs/graphql";

@ObjectType()
export class lawyerData {
    @Field(()=> ID)
    id: number

    @Field()
    isFiscal: boolean

    @Field()
    isIntern: boolean

    @Field()
    registratioDate: Date
    
}

@InputType()
export class createLawyerInput {
    @Field()
    ci: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field({nullable:true})
    phone: string

    @Field({nullable:true})
    address: string

    @Field()
    isFiscal: boolean

    @Field()
    isInterno: boolean

    @Field(()=> Number , {nullable:true})
    cityId: number
}

@ObjectType()
export class lawyerDatas {
    @Field(()=>ID)
    id:number

    @Field()
    ci: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    phone: string

    @Field()
    address: string

    @Field()
    isFiscal: boolean

    @Field()
    isInterno: boolean
}

@ObjectType()
export class createLawyerOutPut {
    @Field()
    message:string

    @Field()
    status: number

    @Field(()=>lawyerData , {nullable:true} )
    lawyesData?: lawyerData | null
}