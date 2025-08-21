import { Field , ObjectType , ID } from "@nestjs/graphql";
import { Legal_Entity } from "./legal_entity.entity";
import { Operator } from "./operator.entity";
import { city } from "src/modules/city/entities/city.entity";

@ObjectType()
export class Persona {
    @Field(()=>ID,{description:"ID de la persona"})
    id:number

    @Field({nullable:true , description:"numero de cedula de identidad"})
    ci:string

    @Field({nullable:true , description:"nombre de la persona"})
    firstName?: string

    @Field({nullable:true,description:"apellido de la persona"})
    lastName?: string

    @Field({nullable:true , description:"numero de telefono de la persona"})
    phone?: string

    @Field({description:"direccion de domicilio de la persona"})
    address: string    
    
    @Field({description:"estado de la persona en el base de datos como activo o inactivo"})
    status:number

    @Field({description:"ID de la ciudad donde vive ela persona"})
    cityId: number

    @Field({description:"ID de user de la persona"})
    userId: number

    @Field(()=> Date , {nullable:true})
    createdAt: Date | null

    @Field(()=> Date , {nullable:true})
    updatedAt: Date | null

    @Field(()=>city,{nullable:true})
    City?: city | null

    @Field(()=>Legal_Entity,{nullable:true})
    legal_Entity?: Legal_Entity | null
    
}