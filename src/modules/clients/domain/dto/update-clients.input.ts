import { ObjectType , InputType , Field , ID, Int  } from "@nestjs/graphql";
import { clientsData } from "./create-clients.input";

@InputType()
export class updateClientInput{
    @Field(()=> Int ,{description:'Identificador unico del cliente'})
    id: number

    @Field(()=>String , {nullable:true , description:'Actualizar Nombre del cliente'})
    firstName: string | null

    @Field(()=> String , {nullable:true , description:'Actualizar Apellido del cliente'})
    lastName: string | null

    @Field(()=> String , {nullable:true , description:'Actualizar Numero de telefono del cliente'})
    phone: string | null

    @Field(()=> String , {nullable:true , description:'Actualizar Direccion del cliente'})
    address: string | null

    @Field(()=> String , {nullable:true , description:'Actualizar Numero de NIT del cliente'})
    NIT: string | null
    
    @Field(() => String , {nullable:true , description:'Actualizar Correo del cliente'})
    email: string | null

    @Field(()=> Boolean , {nullable:true , description:'Actualizar si el cliente es interno o externo'})
    isIntern: boolean

    @Field(()=> Boolean , {nullable:true , description:'Actualizar si el cliente esta activo o no'})
    IsActive: boolean
}

@ObjectType()
export class updateClientOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>clientsData,{nullable:true})
    updateClient:clientsData | null
    
}
