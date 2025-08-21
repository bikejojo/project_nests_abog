import { ObjectType , Field, Int } from "@nestjs/graphql";


@ObjectType()
export class DataCity {
    @Field(()=> Int, {description:'Identificador unico de la ciudad'})
    id:number

    @Field(()=>String, {nullable:true, description:'Nombre de la ciudad'})
    description: string
}

@ObjectType()
export class AllCityDataOutPut {
    @Field(()=>String , {description:'Mensaje de la operacion'})
    message:string

    @Field(()=>Int , {description:'Estado de la operacion'})
    status: number

    @Field(()=>[DataCity] , {nullable:true})
    response: DataCity[] | null 
}