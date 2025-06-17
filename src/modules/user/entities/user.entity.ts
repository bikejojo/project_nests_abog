import { ObjectType , Field , ID, Int } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String ,{nullable:true})
  email: string | null;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  token: string;

  @Field(()=> Int,{nullable:true})
  type: number | null; // 1: empresa, 2: abogado, 3: admin

  @Field()
  isActive?: boolean;

  @Field()
  status: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  //@Field(()=> RolUser , {nullable:true})
  //rols: RolUser | null
  
}