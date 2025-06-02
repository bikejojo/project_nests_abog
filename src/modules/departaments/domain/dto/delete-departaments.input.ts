import { InputType , Field  , ObjectType} from "@nestjs/graphql";
import { departamentsData } from "./create-departaments.input";

@InputType()
export class departamentsDeleteInput {
    @Field()
    id: number    
}

@ObjectType()
export class departamentsDeleteOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>departamentsData,{nullable:true})
    departaments: departamentsData | null
}