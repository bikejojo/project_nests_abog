import { ObjectType , InputType , Field  } from "@nestjs/graphql";

@InputType()
export class assingRolUserInput{
    @Field()
    roleId: number

    @Field()
    userId: number

}

@ObjectType()
export class assingRoleUserData{
    @Field()
    roleId: number

    @Field()
    roleName: string

    @Field()
    userId: number

    @Field()
    userName: string
    
    @Field()
    status: number
}

@ObjectType()
export class assingRolUserOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>assingRoleUserData,{nullable:true})
    assingRole: assingRoleUserData | null

}
