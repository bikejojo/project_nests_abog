import { ObjectType , InputType , Field , ID  } from "@nestjs/graphql";

@InputType()
export class createClientsInput {
    @Field(() => String , {nullable:true, description:"nombre del cliente"})
    firtName: string | null

    @Field(()=> String , {nullable:true, description:"apellido del cliente"})
    lastName: string | null

    @Field(()=> String , {nullable:true, description:"numero de telefono del cliente"})
    phone: string

    @Field( ()=> String , {nullable:true, description:"direccion del cliente"})
    address: string

    @Field(()=> String , {nullable:true, description:"numero de NIT del cliente"})
    NIT: string

    @Field(()=> String , {nullable:true, description:"correo del cliente"})
    email: string

    @Field(()=> Boolean , {nullable:true, description:"indica si el cliente es interno o externo"})
    isIntern: boolean
}

@ObjectType()
export class clientsData {
    @Field(()=> ID)
    id: number

    @Field()
    firtName: string

    @Field()
    lastName: string

    @Field()
    phone: string

    @Field()
    address: string

    @Field()
    NIT: string

}

@ObjectType()
export class createClientsOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(() => clientsData ,{nullable:true})
    createClient: clientsData | null
}

