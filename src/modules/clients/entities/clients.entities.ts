import { ObjectType , Field , ID, Int } from "@nestjs/graphql";

@ObjectType()
export class Clients {
    @Field(()=> ID ,{ description: "ID del cliente"})
    Id: number

    @Field(()=> String , {nullable:true, description:"Segundo numero de telefono del cliente"})
    cellphone: string

    @Field(()=> String , {nullable:true, description:"correo del cliente"})
    email: string

    @Field(()=> String , {nullable:true, description:"NIT del cliente"})
    NIT: string

    @Field(()=> Boolean , {nullable:true, description:"indica si el cliente esta activo o no"})
    isActive: boolean

    @Field(()=> Boolean , {nullable:true, description:"indica si el cliente es interno o externo"})
    isIntern: boolean

    @Field(()=> Int , { nullable:true, description:"indica si el cliente es eliminado o no de la base"})
    status: number

    @Field()
    createAt: Date;

    @Field()
    updateAt: Date
    
}