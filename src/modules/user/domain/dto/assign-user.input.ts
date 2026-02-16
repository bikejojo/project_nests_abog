import { ObjectType , InputType , Field, Int } from "@nestjs/graphql";

@InputType()
export class assingRolUserInput {
    @Field(()=>Int , {description:'Id del rol'})
    idRol: number 

    @Field(()=>Int , {description:'id del user'})
    idUser: number
    
}

@ObjectType()
export class assingRolUserOutPut {
    @Field(()=> String , {nullable:true , description:'mensaje de respuesta'})
    message: string | null

    @Field(()=>Int , {description:'estado de la respuesta'})
    status: number | null
}
