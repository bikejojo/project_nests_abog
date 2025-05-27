import { ObjectType , InputType , Field } from "@nestjs/graphql";

@InputType()
export class createCompanyInput {
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
export class companyData {
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
export class userDataCompany {
    @Field()
    id: number;
    @Field()
    email: string;
    @Field()
    token: string;
}


@ObjectType()
export class createCompanyOutput {
    @Field()
    message: string;
    @Field()
    status: number;
    @Field(() => companyData , { nullable: true })
    company: companyData | null;
    @Field(() => userDataCompany , { nullable:true})
    user: userDataCompany | null;
}
