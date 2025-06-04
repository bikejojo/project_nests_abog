import { ObjectType , Field  } from "@nestjs/graphql";
import { rolesData } from "./create-role.input";

@ObjectType()
export class allRolOutPut{
    @Field()
    message:string

    @Field()
    status: number

    @Field(()=> [rolesData],{nullable:true})
    roleData: rolesData[] | null
}
