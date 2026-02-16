import { Field , ObjectType , InputType , Int  } from "@nestjs/graphql";

@InputType()
export class createRolInput{
    @Field(()=>String , {nullable:true , description:"nombre del cargo/rol"})
    name: string 
    
}

@ObjectType()
export class createRolOutPut {
    @Field(()=>String , {nullable:true , description:"mesnaje de descripcion de la respuesta"})
    message:string

    @Field(()=>Int , {nullable:true , description:"Estado del retorno"})
    status:number
    
}
