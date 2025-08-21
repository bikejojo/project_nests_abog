import { InputType, Field , Int } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UpdateUserInput {
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