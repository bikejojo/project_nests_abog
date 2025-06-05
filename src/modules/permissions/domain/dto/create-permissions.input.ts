import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class createPermissionsInput{
    @Field()
    description: string

}

@ObjectType()
export class dataPermissions{
    @Field()
    id: number

    @Field()
    description: string

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

@ObjectType()
export class createPermisionsOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>dataPermissions,{nullable:true})
    dataPermissions: dataPermissions | null
}