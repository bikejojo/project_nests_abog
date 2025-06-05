import { ObjectType , InputType , Field  } from "@nestjs/graphql";
import { assingRoleUserData } from "./assing-role-user.input";

@InputType()
export class unsubcribeRoleUserInput{
    @Field()
    userId: number

    @Field()
    roleId: number

}

@ObjectType()
export class unsubcribeRoleUserOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> assingRoleUserData , {nullable:true})
    unsubcribeRolUser: assingRoleUserData | null   
}