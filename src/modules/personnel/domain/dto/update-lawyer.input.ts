import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { lawyerData } from "./create-lawyer.input";

@InputType()
export class updateLawyerInput {
    @Field()
    id: number
    @Field()
    firstName:string
    @Field()
    lastName: string
    @Field()
    email: string
    @Field()
    phone: string
    @Field()
    address: string
    
}

@ObjectType()
export class responseUpdateLawyerOutPut {
    @Field()
    message: string
    @Field()
    status: number
    @Field(()=> lawyerData ,{ nullable:true })
    updateLawyer: lawyerData | null
}
