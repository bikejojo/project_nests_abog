import { InputType , Field , ID , ObjectType} from "@nestjs/graphql";
import { departamentsData } from "./create-departaments.input";

@InputType()
export class departamentsFindIdInput {
    @Field()
    id: number
}

@ObjectType()
export class departamentsFindIdOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> departamentsData , {nullable:true})
    departament:departamentsData | null
}
