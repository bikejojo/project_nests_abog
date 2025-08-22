import { ObjectType , Field, Int } from "@nestjs/graphql";

@ObjectType()
export class RefreshTokenResponse {
    @Field(()=>String , {nullable:true , description:'token'})
    accessToken: string;

    @Field(()=>String , {nullable:true , description:'mensaje de respuesta'})
    message: string;

    @Field(()=>Int , {nullable:true , description:'estado'})
    status: number;
}