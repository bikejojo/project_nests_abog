import { ObjectType , InputType , Field } from "@nestjs/graphql";

@InputType()
export class LoginUserInput {
    @Field()
    ci: string;

    @Field()
    password: string;
}

@ObjectType()
export class userData {
    @Field()
    id: number

    @Field()
    name: string;

    @Field()
    ci: string;

    @Field()
    token: string;
    
}

@ObjectType()
export class LoginResponse {
    @Field()
    message: string;
    
    @Field()
    status: number;

    @Field(() => userData , { nullable: true })
    user: userData | null;
}