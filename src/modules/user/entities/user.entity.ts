import { ObjectType , Field , ID } from "@nestjs/graphql";

@ObjectType()
export class User {
@Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  role: string; // empresa  abogado

  @Field({ nullable: true })
  token: string;

  @Field()
  type: number; // 1: empresa, 2: abogado, 3: admin

  @Field()
  isActive?: boolean;

  @Field()
  status: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
  
}