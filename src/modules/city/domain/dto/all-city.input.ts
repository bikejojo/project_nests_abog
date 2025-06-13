import { ObjectType , Field } from "@nestjs/graphql";


@ObjectType()
export class DataCity {
    @Field()
    id:number

    @Field()
    description: string
}

@ObjectType()
export class AllCityDataOutPut {
    @Field()
    message:string

    @Field()
    status: number

    @Field(()=>[DataCity] , {nullable:true})
    allCity: DataCity[] | null 
}