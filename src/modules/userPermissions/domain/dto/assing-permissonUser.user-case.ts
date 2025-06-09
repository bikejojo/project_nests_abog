import { InputType , ObjectType , Field ,  Int } from "@nestjs/graphql";
import { permissionsDataObj } from "src/modules/permissionsRol/domain/dto/findId-permissionsRol.input";

@InputType()
export class assingPermissionsUserInput {

    @Field(()=> [Int] )
    permissionsId: number[]

    @Field()
    userId:number
}

@ObjectType()
export class permissionsUserData {

    @Field()
    permissionsId:number

    @Field()
    rolName: string

    @Field(()=> [permissionsDataObj] ,{nullable:true})
    permissionData: permissionsDataObj[] | null
    
}

@ObjectType()
export class assingPermissionsUserOutPut {
    
    @Field()
    message: string

    @Field()
    status: number

    @Field(() => permissionsUserData ,{nullable:true})
    permissionUserData: permissionsUserData | null
}