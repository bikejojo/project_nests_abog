import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { CompanyUseCase } from "../../domain/services/company.company-case";
import { createCompanyInput , createCompanyOutput } from "../../domain/dto/create-company.input";
import { Company } from "../../entities/company.entity";
import { UseGuards , SetMetadata} from "@nestjs/common";
import { RolesGuard } from "../../../../guards/roles.guards";
import { GqlAuthGuard } from "../../../../auth/authentification";
import { updateDataCompany, responseUpdateCompanyOutput, updatedCompanyInput} from "../../domain/dto/update-company.input";
import { deleteCompanyData, inputDeleteCompany, responseDeleteCompanyOutput } from "../../domain/dto/delete-company.input";


@Resolver(() => Company)
export class CompanyResolver {
    constructor(private readonly companyUseCase: CompanyUseCase){}

    @Mutation(() => createCompanyOutput)
    async createCompany(@Args('data') data: createCompanyInput ){
        return this.companyUseCase.createCompany(data);
    }

    @Mutation(()=> responseUpdateCompanyOutput )
    async updateCompany(@Args('data') data: updatedCompanyInput ){
        return this.companyUseCase.updateCompany(data);
    }
    
    @Mutation(()=>responseDeleteCompanyOutput )
    async deleteCompany(@Args('data') data: inputDeleteCompany ){
        return this.companyUseCase.deleteCompany(data)
    }
    
    @Query(() => String)
    sayHello(): string {
        return 'Hello from CompanyResolver';
    }
}