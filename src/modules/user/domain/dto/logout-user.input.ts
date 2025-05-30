import { Field , ObjectType , InputType } from "@nestjs/graphql";
import { userData } from "./login-user.input";



@ObjectType()
export class LogoutUserOutPut {
    @Field()
    message: string
    @Field()
    status: number
    @Field(()=>userData,{nullable:true})
    logoutData: userData | null
    
}