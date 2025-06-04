import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class createRolesInput{
    
    @Field()
    description: string
    
}

@ObjectType()
export class rolesData{

    @Field(() => ID)
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
export class createRolesOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field()
    rolesDatas:rolesData 
}

