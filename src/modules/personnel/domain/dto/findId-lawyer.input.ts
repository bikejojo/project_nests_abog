import { ObjectType , InputType , Field } from "@nestjs/graphql";
import { lawyerData } from "./create-lawyer.input";

@InputType()
export class findLawyerInput{
    @Field()
    id: number    
}

@ObjectType()
export class responseFindIdLawyerOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> lawyerData , {nullable: true})    
    lawyerFind: lawyerData | null

}

