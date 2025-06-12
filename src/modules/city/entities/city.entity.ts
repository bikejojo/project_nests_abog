import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class city {
    @Field(()=>ID)
    id: number

    @Field()
    description: string
}