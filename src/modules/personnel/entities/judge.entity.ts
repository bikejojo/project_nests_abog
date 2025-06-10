import { ObjectType , Field , ID } from "@nestjs/graphql";
import { BlobOptions } from "buffer";
import { Persona } from "./persona.entity";

@ObjectType()
export class Judge {
    @Field(()=>ID)
    id: number

    @Field()
    registrationDate: Date

    @Field({nullable:true})
    description: string

    @Field()
    isActive: boolean

    @Field()
    isIntern: boolean

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field()
    personId:number

    @Field(()=>Persona)
    persona: Persona
}