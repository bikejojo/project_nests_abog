import { ObjectType , InputType , Field, Int  } from "@nestjs/graphql";

@InputType()
export class deleteBranchOfficeInput{
    @Field(()=>Int , {description:'Se manda la ID de la sucursal para eliminar'})
    id: Number

}

@ObjectType()
export class deleteBranchOfficeOutPut {
    @Field(()=>String,{description:'respuesta de mensaje'})
    message:string; 

    @Field(()=>Int , {description:'codigo del estado que se devuelve.'})
    status:number;

    //@Field()
    
}