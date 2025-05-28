import { ObjectType , InputType , Field } from "@nestjs/graphql";

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
    id: number;
    @Field()
    email: string;
    @Field()
    status: number;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    phone: string;
    @Field()
    address: string;
    @Field()
    userId: number
    
}

@ObjectType()
export class createLawyerOutput {
    @Field()
    message: string;
    @Field()
    status: number;
    @Field(() => lawyerData , { nullable:true})
    LawyerCreate: lawyerData | null
}
