import { ObjectType , InputType , Field , ID } from "@nestjs/graphql";

@InputType()
export class updatePersonLawyerInput {
    @Field(()=>ID)
    id: number

    @Field(()=>String, {description:"serie de numeros de celula de identidad",nullable:true})
    ci: string

    @Field(()=>String, {description:"nombres de la persona",nullable:true})
    firstName: string

    @Field(()=>String, {description:"apellidos de la persona",nullable:true})
    lastName: string

    @Field()
    cityId: number

    @Field(()=>String, {description:"numero de telefono de la persona",nullable:true})
    phone: string

    @Field(()=>String, {description:"direccion de la persona",nullable:true})
    address: string

    @Field(()=>String, {description:"actualizacion de password",nullable:true})
    password: string

    @Field(()=>String, {description:"correo de la persona",nullable:true})
    isInterno: boolean
}

@ObjectType()
export class updateUserPersonLawyerDatas {
    @Field()
    message: string
}

@ObjectType()
export class updateUserPersonLawyerOutPut {
    @Field()
    message: string

    @Field()
    status: number

}