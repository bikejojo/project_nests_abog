import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Menu } from "./menu.entity";
import { Module } from "./module.entity";

@ObjectType()
export class MenuModule {
    @Field(() => ID)
    id: number;

    @Field()
    status: number

    @Field(()=>ID)
    menuId: number;

    @Field(()=>ID)
    moduleId: number;

    @Field(() => Menu, { nullable: true })
    menu?: Menu;

    @Field(() => Module, { nullable: true })
    module?: Module;
}