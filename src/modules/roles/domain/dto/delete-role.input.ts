import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";
import { rolesData } from "./create-role.input";

@InputType()
export class deleteRoleInput{
    @Field(() => ID)
    rolId: number
}

@ObjectType()
export class deleteRoleOutPut{
    @Field()
    message: string
    
    @Field()
    status: number

    @Field(()=>rolesData,{nullable:true})
    roleDatas: rolesData | null
    
}