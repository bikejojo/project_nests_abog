import { ObjectType , InputType , Field , ID} from "@nestjs/graphql";
import { Menu } from "src/modules/moduleMenuPermission/entities/menu.entity";
import { Module } from "src/modules/moduleMenuPermission/entities/module.entity";
import { Permissions } from "src/modules/moduleMenuPermission/entities/permissions.entity";

@InputType()
export class LoginUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class userData {
    @Field(()=> ID)
    id: number | null

    @Field(()=> String , {nullable:true})
    name: string | null;

    @Field(()=> String , {nullable:true})
    ci: string | null;

    @Field(()=> String , {nullable:true})
    token: string | null;

    @Field(()=>[Module],{nullable:'itemsAndList'})
    module:Module[]
    
    @Field(()=>[Menu],{nullable:'itemsAndList'})
    menu:Menu[]

    @Field(()=>[Permissions],{nullable:'itemsAndList'})
    permissions:Permissions[]
}

@ObjectType()
export class LoginResponse {
    @Field()
    message: string;
    
    @Field()
    status: number;

    @Field(() => userData , { nullable: true })
    user: userData | null;
}