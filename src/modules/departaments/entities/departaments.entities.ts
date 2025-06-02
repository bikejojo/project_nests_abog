import { ObjectType , ID , Field } from "@nestjs/graphql";

@ObjectType()
export class departaments {
    @Field(()=>ID)
    id: number

    @Field()
    name: string

    @Field()
    description: string

    @Field()
    status: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}
