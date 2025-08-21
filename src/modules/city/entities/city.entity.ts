import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class city {
    @Field(()=>ID)
    id: number

    @Field(()=>String , {nullable:true, description:"nombre de la ciudad"})
    description: string
}