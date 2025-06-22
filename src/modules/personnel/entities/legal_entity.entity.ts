import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Persona } from "./persona.entity";

@ObjectType()
export class Legal_Entity {
    @Field(()=>ID)
    id: number

    @Field()
    NIT: number

    @Field()
    companyName: string

    @Field()
    address: string

    @Field()
    registrationDate: Date

    @Field()
    legalRepresentive: string

    @Field()
    typeCompany: string

    @Field()
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