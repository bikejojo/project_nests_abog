import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";
import { userData } from "src/modules/user/domain/dto/login-user.input";
import { User } from "src/modules/user/entities/user.entity";
import { lawyerData } from "../lawyer/create-lawyer.input";

@InputType()
export class create_person_input {
    @Field()
    ci: number

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
    isFiscal: number

    @Field()
    isInterno: number
    
    @Field()
    isActive: number
}

@ObjectType()
export class personData {
    @Field()
    id: number

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    phone: string

    @Field()
    address: string

}

@ObjectType()
export class persLawUserData {
    
    @Field(()=>userData,{nullable:true})
    userData: userData | null

    @Field(()=>lawyerData,{nullable:true})
    lawyerData: lawyerData | null

    @Field(()=>personData , {nullable:true})
    personData: personData | null
        
}

@ObjectType()
export class persLawUserOutPut {
    
    @Field()
    message: string

    @Field()
    status:number
    
    @Field(()=>persLawUserData,{nullable:true})
    personLawyUser: persLawUserData | null
}