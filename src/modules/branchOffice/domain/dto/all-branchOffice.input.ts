import { ObjectType , Field , ID, Int } from "@nestjs/graphql";
import { Branch_Office } from "../../entities/branchOffice.entities";

@ObjectType()
export class allBranchOfficeData {
    @Field(()=>Int , {description:'Identificador unico de la sucursal',nullable:true})
    id: number | null

    @Field(()=>String , {description:'Nombre de la sucursal',nullable:true})
    name: string | null

    @Field(()=> Int , {description:'Estado de la sucursal, 1 activo, 0 inactivo',nullable:true})
    status: number | null
    
}

@ObjectType()
export class allBranchOfficeOutPut {
    @Field(()=>String , {description:'Mensaje de la operacion'})
    message: string

    @Field()
    status: number

    @Field(()=> [Branch_Office] , {nullable:true})
    response: Branch_Office[] | null    
}