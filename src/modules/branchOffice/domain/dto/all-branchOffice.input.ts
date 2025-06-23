import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Branch_Office } from "../../entities/branchOffice.entities";

@ObjectType()
export class allBranchOfficeData {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    status: number
    
}

@ObjectType()
export class allBranchOfficeOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> [Branch_Office] , {nullable:true})
    allBranchOffice: Branch_Office[] | null    
}