import { Field , Int, ObjectType  } from "@nestjs/graphql";

@ObjectType()
export class ListAllUserData {
    @Field(()=>Int , {description:"ID de los usuarios"})
    id: number

    @Field(()=>String , {description:"Nombre del usuario"})
    fullName:string

    @Field(()=>String , {description:"Numero de telefono"})
    phone:string

    @Field(()=>String , {description:"Numero de CI"})
    ci:string

    @Field(()=>String , {description:"correo de usuario"})
    email:string

    @Field(()=>String , {description:"Nombre del usuario"})
    username:string

    @Field(()=>Int , {description:"Nombre del usuario"})
    status:number

    @Field(()=>[String] , {description:"Nombre del usuario"})
    branchOffice:string[]

    @Field(()=>String , {description:"Nombre del usuario"})
    role:string
    
}

@ObjectType()
export class ListUserOutPut {
    @Field(()=>String,{description:"Mensaje de respuesta"})
    message:string

    @Field(()=>Int,{description:"Estado de la respuesta"})
    status:number

    @Field(()=>[ListAllUserData],{description:"Listado de los usuarios"})
    response:ListAllUserData[]
}