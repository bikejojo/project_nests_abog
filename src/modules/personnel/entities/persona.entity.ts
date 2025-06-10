import { Field , ObjectType , ID } from "@nestjs/graphql";
import { Natural_Person } from "./natural_person.entity";
import { Judge } from "./judge.entity";
import { Lawyer } from "./lawyer.entity";

@ObjectType()
export class Persona {
    @Field(()=>ID)
    id:number

    @Field()
    ci:string

    @Field({nullable:true})
    firstName?: string

    @Field({nullable:true})
    lastName?: string

    @Field({nullable:true})
    phone?: string

    @Field()
    address: string    
    
    @Field()
    status:number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(()=>Natural_Person , {nullable:true})
    natural_persons?: Natural_Person | null;

    @Field(()=>Judge , {nullable:true})
    judges?: Judge | null

    @Field(()=>Lawyer , {nullable:true})
    lawyers?: Lawyer | null
}