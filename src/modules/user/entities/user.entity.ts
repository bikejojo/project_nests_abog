import { ObjectType , Field , ID, Int } from "@nestjs/graphql";
import { MenuUser } from "src/modules/moduleMenuPermission/entities/menuUser.entity";
import { ModuleUser } from "src/modules/moduleMenuPermission/entities/moduleUser.entity";
import { PermissionsUser } from "src/modules/moduleMenuPermission/entities/permissionsUser.entity";

@ObjectType()
export class User {
  @Field(() => ID,{ description: "ID del usuario"})
  id: number;

  @Field({description:"correo de usuario"})
  email: string;

  @Field(() => String ,{description:"contraseña de user", nullable: true })
  password: string;

  @Field(() => String ,{description:"se guarda el token", nullable: true })
  token: string;

  @Field(()=> String ,{description:"Se guarda el token refresh",nullable:true})
  reftoken: string

  @Field(()=> Int,{description:"descripcion de tipo de user",nullable:true})
  type: number | null; // 

  @Field()
  isActive?: boolean;

  @Field({description:"estado de eliminado o no del sistema"})
  status: number;

  @Field(()=> Int , {nullable:true, description:"ID del rol del usuario"})
  rolId: number | null;

  @Field(()=> Date , {nullable:true})
  createdAt: Date | null;

  @Field(()=> Date , {nullable:true})
  updatedAt: Date | null;

  //@Field(()=> RolUser , {nullable:true})
  //rols: RolUser | null

  /*@Field(()=> [MenuUser] , {nullable:true})
  menuUser: MenuUser[] | null

  @Field(()=>[ModuleUser],{nullable:true})
  moduleUser: ModuleUser[] | null
 
  @Field(()=> [PermissionsUser] , {nullable:true})
  permissionsUser: PermissionsUser[]*/

}