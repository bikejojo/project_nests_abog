import { InputType , ObjectType , ID , Field } from "@nestjs/graphql";
import { rolesData } from "./create-role.input";
import { userData } from "src/modules/user/domain/dto/login-user.input";

@InputType()
export class assignRolInput{
    
    @Field(()=>ID)
    userId: number

    @Field()
    rolId: number

}

@ObjectType()
export class assingRolOutPut {
    @Field()
    message: string

    @Field()
    status:number

    @Field(()=>rolesData,{nullable:true})
    rolData:rolesData | null

    @Field(()=>userData,{nullable:true})
    userData: userData | null
    
}
