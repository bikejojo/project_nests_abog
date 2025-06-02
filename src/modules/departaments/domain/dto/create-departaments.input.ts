import { InputType , ObjectType , Field  } from "@nestjs/graphql";
import { Network } from "inspector";

@InputType()
export class departamentsCreateInput{
    @Field()
    name: string

    @Field()
    description: string
    
}

@ObjectType()
export class departamentsData{
    @Field()
    id:number

    @Field()
    name: string

    @Field()
    description: string

    @Field()
    status: number

    @Field()
    createdAt: Date
    
}

@ObjectType()
export class departamentsCreateOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>departamentsData,{nullable:true})
    departaments:departamentsData | null
    
}
