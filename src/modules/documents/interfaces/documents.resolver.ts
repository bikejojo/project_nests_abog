import { Mutation , Query , Args, Resolver } from "@nestjs/graphql";
import { documentsUseCase } from "../domain/services/documents.use-case";
import { createDocumentsInput , documentsDataOutPut } from "../domain/dto/create-documents.input";

@Resolver()
export class documentsResolver {
    constructor(
        private readonly DocumentsUseCase: documentsUseCase ,
    ){}

    @Mutation(() => documentsDataOutPut)
    async createDocuments(@Args('data') data: createDocumentsInput  ){
        return await this.DocumentsUseCase.createDocuments(data);
    }
}