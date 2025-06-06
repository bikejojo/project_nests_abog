import { InputType , ObjectType , Field , ID , } from "@nestjs/graphql";
import { assingPermissionsRolData } from "./assing-permissionsRol.input";

@InputType()
export class unsubcriptionPermissionRolInput {
    @Field()
    roleId: number

    @Field()
    permissionId: number
}

@ObjectType()
export class unsubcriptionPermissionRolOutPut {
    @Field()
    message: string
    @Field()
    status: number

    @Field(()=>[assingPermissionsRolData],{nullable:true})
    permissRole: assingPermissionsRolData[] | null
}