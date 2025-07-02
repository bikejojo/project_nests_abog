import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";

@InputType()
export class updateNaturalPersonInput {
    @Field(()=>ID)
    id:number

    @Field({nullable:true})
    ci:string

    @Field({nullable:true})
    firstName: string

    @Field({nullable:true})
    lastName: string

    @Field({nullable:true})
    phone:string

    @Field({nullable:true})
    address: string

    @Field({nullable:true})
    registrationDate: Date

    @Field({nullable:true})
    description: string

}

@ObjectType()
export class updateNaturalPersonOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field({nullable:true})
    response?: string
}