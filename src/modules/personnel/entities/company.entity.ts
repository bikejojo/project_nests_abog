import { ObjectType ,  Field , ID }  from "@nestjs/graphql";

@ObjectType()
export class Company {
    @Field(() => ID)
    id: number;
    
    @Field()
    name: string;
    
    @Field()
    email: string;
    
    @Field()
    phone: string;
    
    @Field()
    address: string;

    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;

    @Field(() => ID)
    userId: string;
}
