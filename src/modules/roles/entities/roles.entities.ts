import { ObjectType, ID , Field } from "@nestjs/graphql";
import { RolUser } from "src/modules/rolUser/entities/rolUser.entities";

@ObjectType()
export class roles {

    @Field(()=> ID)
    id: number

    @Field()
    description: string

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(()=> RolUser,{nullable:true})
    rolUser?: RolUser | null
    
}