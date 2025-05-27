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
    id: string;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    role: string;
    @Field()
    phone: string;
    @Field()
    address: string;
}

@ObjectType()
export class createCompanyOutput {
    @Field()
    message: string;
    @Field()
    status: number;
}
