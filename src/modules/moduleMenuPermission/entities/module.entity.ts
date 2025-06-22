import { ObjectType , Field , ID } from "@nestjs/graphql";
import { MenuModule } from "./menuModule.entity";

@ObjectType()
export class Module {
    @Field(() => ID)
    id:number

    @Field()
    name: string

    @Field()
    status: number

    @Field(() => [MenuModule], { nullable: true })
    menuModules?: MenuModule[];
}