import { ObjectType , Field , InputType , ID  } from "@nestjs/graphql";

@InputType()
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