import { InputType , Field , ObjectType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput { 

  @Field()
  password: string;

  @Field()
  lawyerId: number
  
  @Field()
  name: string

}

@ObjectType()
export class createUserLawyerOutPut{

  @Field(()=> String , {nullable:true})
  message: string | null
  
  @Field()
  status: number
  
}