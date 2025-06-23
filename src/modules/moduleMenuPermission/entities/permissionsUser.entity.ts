import { ObjectType , Field , ID} from "@nestjs/graphql";
import { User } from "src/modules/user/entities/user.entity";
import { Permissions } from "./permissions.entity";

@ObjectType()
export class PermissionsUser {
    @Field(()=>ID)
    id:number

    @Field()
    userId: number;

    @Field()
    permissionsId: number;

    @Field()
    status: number

    @Field()
    user: User

    @Field()
    permissions: Permissions
}