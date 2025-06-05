import { InputType, Field , PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  email?: string;

  //@Field()
  //role?: string;

  @Field()
  password?: string;
}