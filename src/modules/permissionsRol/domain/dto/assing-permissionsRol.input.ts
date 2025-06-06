import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class assingPermissionsRolInput{
    @Field()
    rolId: number

    @Field()
    permissionsId: number
}

@ObjectType()
export class assingPermissionsRolData{
    @Field()
    rolId: number

    @Field()
    rolName: string

    @Field()
    permissionId:number

    @Field()
    permissionsName: string
}

@ObjectType()
export class assingPermissionsRolOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>assingPermissionsRolData , {nullable:true})
    permissionsData: assingPermissionsRolData | null
}