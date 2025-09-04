import { InputType , Field , ObjectType, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserInput { 
    @Field(()=>String , {description:"nombre completo de persona"}) 
    fullName: string;

    @Field(()=>String , {description:"numero de cedula de identidad"})
    ci: string;
    
    @Field(()=>String , {description:"numero de telefono"})
    phone: string;

    @Field(()=>String , {description:"nombre de usuario"})
    userName: string;

    @Field(()=>String , {description:"correo de usuario"})
    email: string

    @Field(()=>String , {description:"contraseña de usuario"})
    password: string;

    @Field(()=>String , {description:"Sucursal de ID"})
    branchOfficeId: string;
    
    @Field(()=>String , {description:"Rol de ID del cargo"})
    RolId: string;

    @Field(()=>[Int] , {description:"Lista de IDs de menús asignados"})
    menuId: number[];

    @Field(()=>[Int] , {description:"Lista de IDs de módulos asignados"})
    moduleId: number[];

    @Field(()=>[Int] , {description:"Lista de IDs de permisos asignados"})
    permissionId: number[];
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