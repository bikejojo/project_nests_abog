import { ObjectType , InputType , Field , ID } from "@nestjs/graphql";

@InputType()
export class updateUserPersonLawyerInput {
    @Field(()=>ID)
    id: number

    @Field()
    ci: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    email: string

    @Field()
    phone: string

    @Field()
    address: string

    @Field()
    password: string

    @Field()
    isFiscal: boolean

    @Field()
    isInterno: boolean
}

@ObjectType()
export class updateUserPersonLawyerDatas {
    @Field()
    message: string
}

@ObjectType()
export class updateUserPersonLawyerOutPut {
    @Field()
    message: string

    @Field()
    status: number

}