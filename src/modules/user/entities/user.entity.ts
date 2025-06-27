import { ObjectType , Field , ID, Int } from "@nestjs/graphql";
import { MenuUser } from "src/modules/moduleMenuPermission/entities/menuUser.entity";
import { ModuleUser } from "src/modules/moduleMenuPermission/entities/moduleUser.entity";
import { PermissionsUser } from "src/modules/moduleMenuPermission/entities/permissionsUser.entity";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String , {nullable:true})
  ci: string | null;

  @Field(() => String ,{nullable:true})
  email: string | null;

  @Field(() => String ,{ nullable: true })
  password: string;

  @Field(() => String ,{ nullable: true })
  token: string;

  @Field(()=> Int,{nullable:true})
  type: number | null; // 1: empresa, 2: abogado, 3: admin

  @Field()
  isActive?: boolean;

  @Field()
  status: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  //@Field(()=> RolUser , {nullable:true})
  //rols: RolUser | null

  /*@Field(()=> [MenuUser] , {nullable:true})
  menuUser: MenuUser[] | null

  @Field(()=>[ModuleUser],{nullable:true})
  moduleUser: ModuleUser[] | null
 
  @Field(()=> [PermissionsUser] , {nullable:true})
  permissionsUser: PermissionsUser[]*/

}