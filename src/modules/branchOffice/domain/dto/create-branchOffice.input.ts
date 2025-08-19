import { ObjectType , InputType , Field , ID } from "@nestjs/graphql";

@InputType()
export class CreateBranchOfficeInput {
    @Field()
    name: string;

    @Field()
    address: string;

    @Field()
    cityId: number;

    @Field(() => String , {nullable:true})
    phone?: string | null;

    @Field(() => String ,{ nullable: true })
    email?: string | null;
    
    @Field({ nullable: true })
    status?: number;
    
}

@ObjectType()
export class createDataBranchOffice{
    @Field(()=> ID)
    id:number

    @Field()
    name: string;

    @Field()
    address: string;

    @Field()
    cityId: number;

    @Field(()=> String , {nullable:true})
    phone?: string | null;

    @Field(() => String ,{ nullable: true })
    email?: string | null;
    
    @Field({ nullable: true })
    status?: number;
}

@ObjectType()
export class createBranchOfficeOutPut {
    @Field(()=> String, {nullable:true})
    message: string

    @Field()
    status: number

    @Field(()=> createDataBranchOffice , {nullable:true})
    dataBranchOffice: createDataBranchOffice | null
}