import { ObjectType , Field , InputType } from "@nestjs/graphql";
import { departamentsData } from "./create-departaments.input";

@InputType()
export class departmentsUpdateInput{
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    description:string
}

@ObjectType()
export class departamentsUpdateOutPut{
    @Field()
    message: string

    @Field()
    status : number

    @Field(()=> departamentsData , {nullable:true})
    deparmentsDatas: departamentsData | null
}