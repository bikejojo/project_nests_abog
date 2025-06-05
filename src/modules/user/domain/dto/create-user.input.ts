import { InputType , Field , PartialType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput { 
  @Field()
  name: string;

  @Field()
  email: string;

  //@Field()
  //role: string;

  @Field()
  password: string;

  @Field()
  type: number

  
}