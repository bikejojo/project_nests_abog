import { Field , Int, ObjectType  } from "@nestjs/graphql";

@ObjectType()
export class ListAllUserData {
    @Field(()=>Int , {description:"ID de los usuarios",nullable:true})
    id: number | null

    @Field(()=>String , {description:"Nombre del usuario",nullable:true})
    fullName:string | null

    @Field(()=>String , {description:"Numero de telefono",nullable:true})
    phone:string | null

    @Field(()=>String , {description:"Numero de CI",nullable:true})
    ci:string | null

    @Field(()=>String , {description:"correo de usuario",nullable:true})
    email:string | null

    @Field(()=>String , {description:"Nombre del usuario",nullable:true})
    username:string | null

    @Field(()=>Int , {description:"Nombre del usuario",nullable:true})
    status:number | null

    @Field(()=>[String] , {description:"Nombre del usuario",nullable:true})
    branchOffice:string[]

    @Field(()=>String , {description:"Nombre del usuario",nullable:true})
    role:string | null
    
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