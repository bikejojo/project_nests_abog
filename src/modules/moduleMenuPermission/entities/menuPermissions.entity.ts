import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Menu } from "./menu.entity";
import { Permissions } from "./permissions.entity";

@ObjectType()
export class MenuPermissions {
    @Field(() => ID)
    id: number;

    @Field()
    status: number;

    @Field(() => ID)
    menuId: number;

    @Field(() => ID)
    permissionsId: number;

    @Field(() => Menu, { nullable: true }) 
    menu?: Menu;
    
    @Field(() => Permissions, { nullable: true })  
    permissions?: Permissions;
    
}