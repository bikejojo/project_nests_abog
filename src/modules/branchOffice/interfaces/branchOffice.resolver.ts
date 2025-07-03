import { Mutation, Args ,Query , Resolver  } from "@nestjs/graphql";
import { Branch_Office } from "../entities/branchOffice.entities";
import { allBranchOfficeOutPut } from "../domain/dto/all-branchOffice.input";
import { BranchOfficeUseCase } from "../domain/service/branchOffice.use-case";
import { CreateBranchOfficeInput, createBranchOfficeOutPut } from "../domain/dto/create-branchOffice.input";
import { updateBranchOfficeInput, updateBranchOfficeOutPut } from "../domain/dto/update-branchOffice.input";

@Resolver(()=>Branch_Office)
export class branchOfficeResolver {
    constructor(
        private readonly branchOfficce: BranchOfficeUseCase
    ){}

    @Query(()=> allBranchOfficeOutPut)
    async allBranchOffice(){
        return await this.branchOfficce.listCityData();
    }

    @Mutation(()=>createBranchOfficeOutPut)
    async createdBranchOffice(@Args('data') data:CreateBranchOfficeInput ){
        return await this.branchOfficce.createdBranchOffice(data);
    }

    @Mutation(()=>updateBranchOfficeOutPut)
    async updatedBranchOffice(@Args('data') data:updateBranchOfficeInput) {
        return await this.branchOfficce.updatedBranchOffice(data);
    }
}
