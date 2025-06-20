import { ObjectType , Field , ID } from "@nestjs/graphql";
import { MenuPermissions } from "./menuPermissions.entity";


@ObjectType()
export class Permissions {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    status: number;

    @Field(() => [MenuPermissions], { nullable: true })
    menuPermissions?: MenuPermissions[];

}