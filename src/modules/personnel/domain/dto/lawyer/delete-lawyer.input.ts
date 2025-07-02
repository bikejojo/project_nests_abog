import { ObjectType , InputType , ID , Field } from "@nestjs/graphql";

@InputType()
export class deletedLawyerInput {
    @Field(()=>ID)
    id:number

    @Field({nullable:true})
    status: String
}

@ObjectType()
export class deleteLawyerData {
    @Field()
    id: number
}

@ObjectType()
export class deletedLawyerOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field(()=>deleteLawyerData ,  {nullable:true})
    lawyerData?: deleteLawyerData | null    
}