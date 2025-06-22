import { ObjectType , Field , ID } from "@nestjs/graphql";
import { MenuModule } from "./menuModule.entity";

@ObjectType()
export class Menu {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    status: number

    @Field(() => [MenuModule], { nullable: true })
    moduleMenus?: MenuModule[];
}