import { InputType , Field , ObjectType , ID } from "@nestjs/graphql";
import { GraphQLUpload } from 'graphql-upload';
import type { FileUpload } from 'graphql-upload'; // Solo para tipado

@InputType()
export class createDocumentsInput {
    @Field(()=>ID)
    id:number

    @Field()
    type:number

    @Field(()=>GraphQLUpload, { nullable: true })
    file: Promise<FileUpload> | null ;

}

@ObjectType()
export class documentsDataOutPut {
    @Field(()=> String , { nullable: true })
    message: string

    @Field(()=> String , { nullable: true })
    status: number

    @Field(()=> String , { nullable: true })
    documents:string

}
