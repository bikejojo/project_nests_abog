import { InputType , ObjectType , Field ,ID } from "@nestjs/graphql";

@InputType()
export class unsubcriptionPermissionsUserInput {
    @Field()
    userId:number

    @Field()
    permissionsId:number
}

@ObjectType()
export class unsubcriptionPermissionsUserOutPut {
    @Field()
    message:string
}
