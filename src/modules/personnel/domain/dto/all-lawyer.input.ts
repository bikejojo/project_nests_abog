import { ObjectType , Field } from "@nestjs/graphql";
import { lawyerData } from "./create-lawyer.input";

@ObjectType()
export class responseAllStatusLawyerOutPut {
    @Field()
    message: string
    
    @Field()
    status: number

    @Field(() => [lawyerData] , {nullable:true})
    allLawyer:lawyerData[] | null
}
