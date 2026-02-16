import { InputType , Field , ObjectType , ID, Int } from "@nestjs/graphql";

@InputType()
export class updateBranchOfficeInput {

    @Field(()=> Int)
    id:number

    @Field()
    name: string;

    @Field()
    address: string;

    @Field(()=> String, {nullable:true})
    phone?: string | null;

    @Field(()=> String, { nullable: true })
    email?: string | null;
    
    @Field({ nullable: true })
    status?: number;
    
}

@ObjectType()
export class updateDataBranchOffice{
    @Field(()=> ID)
    id:number

    @Field()
    name: string;

    @Field()
    address: string;

    @Field(()=> String, {nullable:true})
    phone?: string | null;

    @Field(()=> String, { nullable: true })
    email?: string | null;
    
    @Field({ nullable: true })
    status?: number;
}

@ObjectType()
export class updateBranchOfficeOutPut {
    
    @Field(()=> String, {nullable:true})
    message:string | null

    @Field()
    status: number

    @Field(()=>updateDataBranchOffice,{nullable:true})
    dataBranchOffice: updateDataBranchOffice | null
}