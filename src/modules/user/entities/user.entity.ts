import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class User {
@Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string; // empresa  abogado

  @Field()
  isActive: boolean;

  @Field()
  status: boolean;

  @Field()
  createdAt: Date;

}