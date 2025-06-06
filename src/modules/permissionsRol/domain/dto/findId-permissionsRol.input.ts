import { Field , ObjectType , InputType , Int } from "@nestjs/graphql";

@InputType()
export class findIdPermissonsRolInput{
    @Field( () => Int )
    rolId: number

}

@ObjectType()
export class permissionsDataObj{
    @Field( () => Int )
    permissionId: number

    @Field()
    description: string
}


@ObjectType()
export class findIdPermissionsRolData{
    @Field( () => Int )
    rolId: number

    @Field()
    rolName: string

    @Field(()=> [ permissionsDataObj ])
    permissions: permissionsDataObj[]
}

@ObjectType()
export class findIdPermissionsRolOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>findIdPermissionsRolData , {nullable:true} )
    permissionsRolOutPut: findIdPermissionsRolData | null
}
