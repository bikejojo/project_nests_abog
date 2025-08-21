import { InputType, Field , Int } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";
import { ObjectType } from "@nestjs/graphql";

@InputType()
export class UpdateUserPersonInput {
  @Field(()=>Int, { description: "Identificador unico del usuario" })
  id: number;

  @Field(()=>String, { nullable: true, description: "Nombre del usuario" })
  firstName?: string;

  @Field(()=>String, { nullable: true, description: "Apellido del usuario" })
  lastName?: string;

  @Field(()=>String, { nullable: true, description: "Correo del usuario" })
  email?: string;

  @Field(()=>String, { nullable: true, description: "Password de usuario actualizado" })
  password?: string;

  @Field(()=>String, { nullable: true, description: "Numero de cedula de identidad" })
  ci: string;
  
}

@ObjectType()
export class UserContent{
  @Field(()=>Int, { description: "Identificador unico del usuario" })
  userId: number;

  @Field(()=>String, { description: "Nombre del usuario" })
  firstName: string;  

  @Field(()=>String, { description: "Apellido del usuario" })
  lastName: string;
  
  @Field(()=>String, { description: "Correo del usuario" })
  email: string

  @Field(()=>String, { description: "Numero de cedula de identidad" })
  ci: string;


  
}

@ObjectType()
export class UpdateUserOutPut{
  @Field(()=> String, { description: "mensaje de respuesta" })
  message:string
  
  @Field(()=> Int, { description: "status de la respuesta" })
  status:number

  @Field(()=>UserContent, {nullable:true , description: "contenido de la respuesta de user" })
  response: UserContent | null;
}