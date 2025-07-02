import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class dataJudegeAll {
    @Field()
    id:number

    @Field()
    fullName:string

    @Field()
    ci:string

    @Field()
    address:string
}

@ObjectType()
export class allActiveStatusOutPut {
    @Field()
    message:string

    @Field()
    status: number

    @Field(()=>[dataJudegeAll],{nullable:true})
    response?:dataJudegeAll[] | null
}