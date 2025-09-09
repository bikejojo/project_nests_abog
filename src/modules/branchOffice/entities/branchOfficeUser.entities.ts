import { Branch_Office } from "./branchOffice.entities";
import { Field , Int , ObjectType , ID } from "@nestjs/graphql";

@ObjectType()
export class branchOfficeUser {
    @Field(()=>ID)
    id:number

    @Field(()=>Int,{description:"Estado al que pertenece una persona en la oficina."})
    status: number

    @Field(()=>Int,{description:"ID de la persona"})
    personId: number

    @Field(()=>Int , {description:"ID de la oficina"})
    branchOffId: number
}
