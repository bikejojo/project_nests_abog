import { ObjectType , InputType , Field , ID, Int } from "@nestjs/graphql";

@InputType()
export class assingUserDataInput {
    @Field(()=> ID)
    id: number

    @Field(()=> [Int] , {nullable: 'itemsAndList'})
    moduleIds: number[]

    @Field(()=> [Int] , {nullable: 'itemsAndList'})
    menuIds: number[] 
    
    @Field(()=>[Int] , {nullable: 'itemsAndList'})
    permissionsIds: number[]
}

@ObjectType()
export class assingUserDataOutPut {
    @Field()
    message:string

    @Field()
    status:number
}