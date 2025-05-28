import { ObjectType ,  Field , ID }  from "@nestjs/graphql";

@ObjectType()
export class Lawyer{
    @Field(()=> ID)
    id: number   
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
    status: number
    @Field(()=>ID)   
    userId: number
    
    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;
}
