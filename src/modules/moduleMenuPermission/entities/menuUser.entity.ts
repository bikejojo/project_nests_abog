import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Menu } from "./menu.entity";
import { User } from "../../../modules/user/entities/user.entity";

@ObjectType()
export class MenuUser {
    @Field(() => ID)
    id: number;

    @Field()
    status: number;

    @Field()
    userId: number;

    @Field()
    menuId: number;
    
    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => Menu, { nullable: true })
    menu?: Menu;
}