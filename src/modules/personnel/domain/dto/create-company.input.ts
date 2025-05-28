import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { userData } from "src/modules/user/domain/dto/login-user.input";

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
    @Field(() => userData , { nullable:true})
    user: userData | null;
}
