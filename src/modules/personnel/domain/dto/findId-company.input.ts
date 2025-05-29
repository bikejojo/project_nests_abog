import { InputType , ObjectType , Field , ID } from "@nestjs/graphql"; 
import { companyData } from "./create-company.input";

@InputType()
export class inputCompanyId{

    @Field()
    id: number
}

@ObjectType()
export class responseFindCompanyOutPut{

    @Field()
    message: string

    @Field()
    status: number

    @Field(() => companyData, { nullable: true} )
    companyId: companyData | null
}
