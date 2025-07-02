import { InputType , ObjectType , Field , ID } from "@nestjs/graphql";
import { personData } from "../persona/create-persona.input";
import { userData } from "src/modules/user/domain/dto/login-user.input";

@InputType()
export class createNaturalPersonInput{
    @Field({nullable:true})
    ci:string

    @Field({nullable:true})
    firstName: string

    @Field({nullable:true})
    lastName:string

    @Field({nullable:true})
    phone: string
    
    @Field({nullable:true})
    address: string

    @Field()
    registrationDate: Date

    @Field()
    description: string

}

@ObjectType()
export class naturalPersonData{
    @Field()
    id: number

    @Field()
    registrationData: Date

    @Field()
    description: string
    
}

@ObjectType()
export class naturalPersonPersonUserData{
    @Field(()=>userData, {nullable:true})
    userDats: userData | null 
    
    @Field(()=>personData , {nullable:true})
    personDats: personData | null
    
    @Field(()=>naturalPersonData,{nullable:true})
    naturalPersons: naturalPersonData | null
}

@ObjectType()
export class createNaturalPersonOutPut{
    @Field()
    message: string

    @Field()
    status: number

    @Field(() => naturalPersonPersonUserData , {nullable:true})
    naturalPersonUserData?: naturalPersonPersonUserData | null
}