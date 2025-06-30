import { InputType , ObjectType , Field , ID , Int } from "@nestjs/graphql";

@InputType()
export class deleteNaturalPersonInput {
    @Field(()=>ID)
    id:number
    
}

@ObjectType()
export class deleteNaturalPersonOutPut {
    @Field(()=>String,{nullable:true})
    message: string

    @Field({nullable:true})
    status: number
        
}