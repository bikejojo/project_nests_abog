import { ObjectType , Field , ID } from "@nestjs/graphql";
import { RolUser } from "src/modules/rolUser/entities/rolUser.entities";

@ObjectType()
export class User {
@Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  //@Field()
  //rolsId: number//string; // empresa  abogado

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

  @Field(()=> RolUser , {nullable:true})
  rols: RolUser | null
  
}