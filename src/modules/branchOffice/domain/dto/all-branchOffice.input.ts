import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class allBranchOfficeData {
    @Field()
    id: number

    @Field()
    description: string

    @Field()
    status: number
    
}

@ObjectType()
export class allBranchOfficeOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=> [allBranchOfficeData] , {nullable:true})
    allBranchOffice: allBranchOfficeData[] | null    
}