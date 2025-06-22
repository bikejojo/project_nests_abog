import { ObjectType , Field  } from "@nestjs/graphql";
import { Menu } from "../../entities/menu.entity";


@ObjectType()
export class contentModuleMenuPermissions {

    @Field()
    moduleId: number;

    @Field(()=>String, { nullable: true })
    moduleName?: string;

    @Field(()=> [contentMenuPermissions] , {nullable:true})
    contentModPermi: contentMenuPermissions[] | null;
}

@ObjectType()
export class contentMenuPermissions {
    @Field()
    menuId: number;

    @Field(()=> String, { nullable: true })
    menuName:string | null;
    
    @Field(()=> [contentPermissions], { nullable: true })
    contentPermissions: contentPermissions[] | null;
}

@ObjectType()
export class contentPermissions {
    @Field()
    permissionsId: number;

    @Field(()=> String, { nullable: true })
    permissionsName: string | null
}


@ObjectType()
export class AllModuleMenuPermissionDataOutPut {
    @Field()
    message: string;

    @Field()
    status: number;

    @Field(() => [contentModuleMenuPermissions], { nullable: true })
    allModuleMenuPermission: contentModuleMenuPermissions[] | null;
}