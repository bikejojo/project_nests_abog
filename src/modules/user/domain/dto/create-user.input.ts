import { InputType , Field , ObjectType, Int } from "@nestjs/graphql";


@InputType()
class permissionInput {
    @Field(()=>Int)
    permissionId:number
}

@InputType()
class MenuPermissionss {
    @Field(()=> Int , {description:"ID del menu"})
    menuId: number;

    @Field(()=>[permissionInput] , {description:"Lista de permisos asignados al modulo"})
    permissionIds: permissionInput[];
    
}

@InputType()
class ModulePermission{
    @Field(()=>Int , {description:"ID de modulo"})
    moduleId: number;

    @Field(()=>[MenuPermissionss],{description:"menus con permisos asignados"})
    menus: MenuPermissionss[];
    
}

@InputType()
export class CreateUserInput { 
    @Field(()=>String , {description:"nombre completo de persona"}) 
    fullName: string;

    @Field(()=> Int , {description:"numero de cedula de identidad"})
    ci: number;
    
    @Field(()=>Int , {description:"numero de telefono"})
    phone: number;

    @Field(()=>String , {description:"nombre de usuario"})
    userName: string;

    @Field(()=>String , {description:"correo de usuario"})
    email: string

    @Field(()=>String , {description:"contraseña de usuario"})
    password: string;

    @Field(()=>[Int] , {description:"Sucursal de ID"})
    branchOfficeId: number[];
    
    @Field(()=>Int , {description:"Rol de ID del cargo"})
    RolId: number;

    @Field(()=> [ModulePermission] , {description:"Lista de IDs de permisos asignados"})
    permisos: ModulePermission[];
}



// Tipo para la respuesta del usuario creado

@ObjectType()
export class PersonResponse {
    @Field(() => String)
    id: string;

    @Field(() => String)
    ci: string;

    @Field(() => String)
    firstName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    address: string;

    @Field(() => Number)
    status: number;

    @Field(() => String)
    userId: string;

    @Field(() => Number)
    cityId: number;
}

@ObjectType()
export class UserResponse {
    @Field(() => String)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String, { nullable: true })
    token?: string;

    @Field(() => Number)
    type: number;

    @Field(() => Boolean)
    isActive: boolean;

    @Field(() => Number)
    status: number;


    @Field(() => PersonResponse, { nullable: true })
    person?: PersonResponse;
}

@ObjectType()
export class createUserLawyerOutPut{

  @Field(()=> String , {nullable:true})
  message: string | null
  
  @Field()
  status: number
  
  @Field(() => UserResponse, { nullable: true })
  response?: UserResponse;
}