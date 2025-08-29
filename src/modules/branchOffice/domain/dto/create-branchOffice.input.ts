import { ObjectType , InputType , Field , ID, Int } from "@nestjs/graphql";

@InputType()
export class CreateBranchOfficeInput {
    @Field()
    name: string;

    @Field(()=>String,{nullable:true,description:'direccion de sucursal'})
    address: string;

    @Field(()=>Int , {nullable:true , description:"Id de ciudad"})
    cityId: number | null;

    @Field(() => String , {nullable:true})
    phone?: string | null;

    @Field(() => String ,{ nullable: true })
    email?: string | null;
        
}

@ObjectType()
export class createDataBranchOffice{
    @Field(()=> ID)
    id:number

    @Field()
    name: string;

    @Field({nullable:true})
    address: string;

    @Field(()=>Int,{nullable:true})
    cityId: number | null;

    @Field(()=> String , {nullable:true})
    phone?: string | null;

    @Field(() => String ,{ nullable: true })
    email?: string | null;
    
    @Field(()=>Int,{ nullable: true })
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