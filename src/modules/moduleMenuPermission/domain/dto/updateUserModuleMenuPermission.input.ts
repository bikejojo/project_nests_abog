import { ObjectType , InputType , ID , Field , Int } from "@nestjs/graphql";

@InputType()
export class updateUserModuleMenuPermissionsInput {
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
export class updateUserModuleMenuPermissionsOutPut {
    @Field()
    message:string

    @Field()
    status:number
}