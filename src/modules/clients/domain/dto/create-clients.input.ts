import { ObjectType , InputType , Field , ID, Int  } from "@nestjs/graphql";

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

    @Field(()=>String, {nullable:true,description:"CI del clients"})
    ci:string
}

@ObjectType()
export class clientsData {
    @Field(()=> Int , {description:'Identificador unico del cliente'})
    id: number

    @Field(()=>String , {nullable:true, description:"nombre del cliente"})
    firtName: string

    @Field(()=>String , {nullable:true, description:"apellido del cliente"})
    lastName: string

    @Field(()=>String , {nullable:true, description:"numero de telefono del cliente"})
    phone: string

    @Field(()=>String , {nullable:true, description:"direccion del cliente"})
    address: string

    @Field(()=>String , {nullable:true, description:"NIT de cliente"})
    NIT: string

    @Field(()=>Int , {nullable:true,description:"estado de la base de datos"})
    status:number
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

