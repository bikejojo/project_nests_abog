import { ObjectType , InputType , Field ,  Int  } from "@nestjs/graphql";

@InputType()
export class updateRolesInput {
    @Field(()=>Int , {nullable:true , description:"ID del roles"})
    id:number

    @Field(()=>String , {nullable:true , description:"Nombre a actualizar el valor"})
    name:string
    
}

@ObjectType()
export class updateRolesOutPut {
    @Field(()=>String , {nullable:true , description:"nombre del mensaje"})
    message:string

    @Field(()=>Int , {nullable:true , description:"numero de estado"})
    status:number
    
}