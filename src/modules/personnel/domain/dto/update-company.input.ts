import { ObjectType , InputType , Field } from "@nestjs/graphql";

@InputType()
export class updatedCompanyInput {

    @Field()
    id: number
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
export class updateDataCompany {
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    role: string;
    @Field()
    password: string;
    @Field()
    phone: string;
    @Field()
    address: string;
}


@ObjectType()
export class responseUpdateCompanyOutput {

    @Field()
    message:string
    @Field()
    status: number
    @Field(()=>updateDataCompany , {nullable:true})
    updateDataCompany:updateDataCompany | null    
    
}
