import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Persona } from "./persona.entity";

@ObjectType()
export class Legal_Entity {
    @Field(()=>ID,{description:"ID de la entidad legal"})
    id: number

    @Field({description:"numero de NIT de la entidad legal"})
    NIT: number

    @Field({description:"nombre de la entidad legal"})
    companyName: string

    @Field({description:"direccion de la entidad legal"})
    address: string

    @Field({description:"fecha de registro de la entidad legal"})
    registrationDate: Date

 
    @Field({description:"nombre de referencia de tipo de compania"})
    typeCompany: string

    @Field({description:"estado de la entidad legal en el sistema como activo o inactivo"})
    status:number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field()
    personId: number

    @Field(()=>Persona)
    persona: Persona
}