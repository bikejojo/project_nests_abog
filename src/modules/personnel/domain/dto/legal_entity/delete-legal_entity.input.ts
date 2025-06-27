import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class deleteLegalEntityInput{
    
    @Field(()=>ID)
    id:number
}

@ObjectType()
export class deleteLegalEntityOutPut {
    @Field(()=>String , {nullable:true})
    message: string

    @Field()
    status: number
}