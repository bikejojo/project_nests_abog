import { ObjectType, ID , Field } from "@nestjs/graphql";
import { PermissionsRols } from "src/modules/permissionsRol/entities/permissionsRols.entity";

@ObjectType()
export class roles {

    @Field(()=> ID)
    id: number

    @Field()
    description: string

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(() => [PermissionsRols], { nullable: true })
    permissions?: PermissionsRols[] | null;
    
}