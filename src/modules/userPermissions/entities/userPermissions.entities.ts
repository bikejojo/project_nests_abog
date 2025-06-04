import { Field , ObjectType , ID } from "@nestjs/graphql";
import { Permissions } from "src/modules/permissions/entities/permissions.entities";
import { User } from "src/modules/user/entities/user.entity";

@ObjectType()
export class userPermissions {
    @Field(()=>ID)
    id: number

    @Field()
    userId: number 
    
    @Field()
    permissionsId: number

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(()=>User,{nullable:true})
    user: User | null

    @Field(()=>Permissions,{nullable:true})
    permissions: Permissions | null
    
}