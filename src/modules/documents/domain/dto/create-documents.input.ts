import { InputType , Field , ObjectType , ID } from "@nestjs/graphql";
import { GraphQLUpload , FileUpload } from 'graphql-upload';

@InputType()
export class createDocumentsInput {
    @Field(()=>ID)
    id:number

    @Field(()=>GraphQLUpload )
    file: FileUpload;

}

@ObjectType()
export class documentsDataOutPut {
    @Field()
    message: string

    @Field()
    status: number

    @Field()
    documents:string

}
