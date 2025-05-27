import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { updateDataCompany } from "./update-company.input";

@InputType()
export class inputDeleteCompany {
    @Field()
    id: number
}

@ObjectType()
export class deleteCompanyData {
    @Field()
    id: number;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    phone: string;
    @Field()
    address: string;
}

@ObjectType()
export class responseDeleteCompany {
    
    @Field()
    message: string
    @Field()
    status: number
    @Field(()=>deleteCompanyData, {nullable:true})
    deleteCompany:deleteCompanyData | null
    
}
