import { ObjectType , ID , Int , InputType , Field } from "@nestjs/graphql";
import { ListAllUserData } from "./ListAll-user.input";

@InputType()
export class getUserInput{
    @Field(()=>Int , {description:"Id de usuario"} )
    id: number
}


@ObjectType()
export class getUserOutPut {
    @Field(()=>String , {description:"mensaje de descripcion del retorno"})
    message:string;

    @Field(()=>Int , {description:"estado del retorno"})
    status:number;

    @Field(()=>ListAllUserData , {description:"contenido del retorno", nullable:true})
    response:ListAllUserData | null
}