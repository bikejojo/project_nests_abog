import { ObjectType , ID , Field } from "@nestjs/graphql";
import { roles } from "src/modules/roles/entities/roles.entities";
import { User } from "src/modules/user/entities/user.entity";

@ObjectType()
export class RolUser {
    @Field(()=>ID)
    id: number

    @Field()
    rolId: number

    @Field()
    userId: number
    
    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    @Field(()=>User , {nullable:true})
    user?:User | null

    @Field(()=>roles,{nullable:true})
    rol: roles | null
}
