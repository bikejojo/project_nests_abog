import { ObjectType , InputType , Int , Field } from "@nestjs/graphql";

@InputType()
export class deleteRolInput {
    @Field(()=>Int , {nullable:true , description:"ID del rol"})
    id: number
}

@ObjectType()
export class deleteRolOutPut {
    @Field(()=>String ,{nullable:true , description:"Mensaje de respuesta"})
    message:string

    @Field(()=>Int , {nullable:true , description:"Estado del retorno"})
    status:number
    
}