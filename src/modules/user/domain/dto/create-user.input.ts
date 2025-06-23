import { InputType , Field , ObjectType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput { 

  @Field()
  password: string;

  @Field(()=>String , {nullable:true})
  lawyerId: number
  
  @Field()
  name: string

  @Field()
  roleId:number

  @Field()
  branchOfficeId: number

  @Field({nullable:true})
  email: string
}

@ObjectType()
export class createUserLawyerOutPut{

  @Field(()=> String , {nullable:true})
  message: string | null
  
  @Field()
  status: number
  
}