import { ObjectType , ID , Field } from "@nestjs/graphql";
import { Persona } from "./persona.entity";

@ObjectType()
export class Natural_Person {
    @Field(()=>ID)
    id: number

    @Field()
    registrationDate: Date

    @Field()
    description: string

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field()
    personId:number

    @Field(()=>Persona)
    persona:Persona
}