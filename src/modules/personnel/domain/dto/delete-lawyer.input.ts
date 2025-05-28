import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { lawyerData } from "./create-lawyer.input";

@InputType()
export class deleteLawyerInput{
    @Field()
    id: number
}

@ObjectType()
export class responseDeleteLawyerOutPut {
    @Field()
    message: string
    @Field()
    status: number
    @Field(()=>lawyerData,{nullable:true})
    deleteLawyer: lawyerData | null   
}