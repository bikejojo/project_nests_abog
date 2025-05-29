import { ObjectType ,  Field , ID} from "@nestjs/graphql";
//import { companyData } from "./create-company.input";


@ObjectType()
export class companyDatas{
    @Field(() => ID)
    id: number

    @Field()
    name: string

    @Field()
    email: string
    
    @Field()
    phone :string

    @Field()
    address: string
    
}

@ObjectType()
export class responseAllStatusCompanyOutPut{

    @Field()
    message: string

    @Field()
    status: number

    @Field(() => [companyDatas] , {nullable:true})
    allCompanys: companyDatas[] | null
    
}
