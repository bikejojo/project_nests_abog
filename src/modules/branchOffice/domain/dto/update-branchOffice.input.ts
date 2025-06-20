import { InputType , Field , ObjectType , ID } from "@nestjs/graphql";

@InputType()
export class updateBranchOfficeInput {

    @Field(()=> ID)
    id:number

    @Field()
    name: string;

    @Field()
    address: string;

    @Field()
    cityId: number;

    @Field( {nullable:true})
    phone?: string | null;

    @Field({ nullable: true })
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

    @Field()
    cityId: number;

    @Field( {nullable:true})
    phone?: string | null;

    @Field({ nullable: true })
    email?: string | null;
    
    @Field({ nullable: true })
    status?: number;
}

export class updateBranchOfficeOutPut {
    
    @Field()
    message:string | null

    @Field()
    status: number

    @Field(()=>updateDataBranchOffice,{nullable:true})
    dataBranchOffice: updateDataBranchOffice | null
}