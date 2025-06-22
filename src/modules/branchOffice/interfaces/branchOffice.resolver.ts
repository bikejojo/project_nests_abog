import { Query , Resolver  } from "@nestjs/graphql";
import { Branch_Office } from "../entities/branchOffice.entities";
import { allBranchOfficeOutPut } from "../domain/dto/all-branchOffice.input";
import { BranchOfficeUseCase } from "../domain/service/branchOffice.use-case";

@Resolver(()=>Branch_Office)
export class branchOfficeResolver {
    constructor(
        private readonly branchOfficce: BranchOfficeUseCase
    ){}

    @Query(()=> allBranchOfficeOutPut)
    async allBranchOffice(){
        return await this.branchOfficce.listCityData();
    }
}
