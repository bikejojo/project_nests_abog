import { ObjectType , Field , ID } from "@nestjs/graphql";
import { roles } from "src/modules/roles/entities/roles.entities";
import { Permissions } from "src/modules/permissions/entities/permissions.entities";

@ObjectType()
export class PermissionsRols {
    @Field(()=>ID)
    id: number

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(()=>roles)
    rol: roles

    @Field(()=> Permissions)
    permission:Permissions
}