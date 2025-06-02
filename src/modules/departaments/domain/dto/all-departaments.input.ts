import { ObjectType , Field } from "@nestjs/graphql";
import { departamentsData } from "./create-departaments.input";

@ObjectType()
export class departamentsAllOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(() =>[departamentsData],{nullable:true})
    departamentData: departamentsData[] | null    
}