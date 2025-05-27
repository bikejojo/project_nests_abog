import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { Lawyer } from "@prisma/client";

@InputType()
export class createLawyerInput {
    @Field()
    email: string;
    @Field()
    role: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    phone: string;
    @Field()
    address: string;
}

@ObjectType()
export class lawyerData {
    @Field()
    id: string;
    @Field()
    email: string;
    @Field()
    role: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
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
    @Field(() => lawyerData , { nullable:true})
    Lawyer: Lawyer | null
}
