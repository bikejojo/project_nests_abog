import { InputType , ObjectType , Field , Int , ID , DateScalarMode} from "@nestjs/graphql";

@InputType()
export class createReportInput {
    @Field(()=> Date , {nullable:true})
    startDate: Date

    @Field(()=> Date , {nullable:true})
    endDate: Date
    
}

@ObjectType()
export class createReportOutPut {

}