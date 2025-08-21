import { Field , ObjectType , ID } from "@nestjs/graphql";
import { Persona } from "./persona.entity";
import { Branch_Office } from "src/modules/branchOffice/entities/branchOffice.entities";


@ObjectType()
export class Operator {
    @Field(()=>ID,{description:"ID de Operador"})
    id:number

    @Field({nullable:true , description:"fecha de registro del operador"})
    registrarionDate?: Date
    
    @Field({nullable:true , description:"El sistema esta activado o no , on es lo mismo que este elimando o no"})
    isActive: boolean
    
    @Field({nullable:true, description:"Si es un operador interno o no de la empresa"})
    isIntern: boolean

    @Field({description:"estado de eliminado o no del sistema"})
    status: number
    
    @Field({description:"ID de la persona que es el operador"})
    personId: number

    @Field({description:"ID de la sucursal donde trabaja el operador"})
    branchOfficeId?: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(()=>Persona,{nullable:true})
    person : Persona | null
    
    @Field(()=> Branch_Office,{nullable:true})
    branch_office?: Branch_Office | null
}