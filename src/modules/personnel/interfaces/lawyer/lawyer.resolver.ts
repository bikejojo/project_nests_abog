import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { LawyerUseCase } from "../../domain/services/lawyer.lawyer-case";
import { Lawyer } from "../../entities/lawyer.entity";
import { UseGuards , SetMetadata } from "@nestjs/common";
import { RolesGuard } from "src/guards/roles.guards";
import { GqlAuthGuard } from "src/auth/authentification";
import { createLawyerInput , createLawyerOutput} from "../../domain/dto/create-lawyer.input";
import { responseUpdateLawyerOutPut , updateLawyerInput  } from "../../domain/dto/update-lawyer.input";
import { responseDeleteLawyerOutPut , deleteLawyerInput } from "../../domain/dto/delete-lawyer.input";
import { responseFindIdLawyerOutPut , findLawyerInput } from "../../domain/dto/findId-lawyer.input";
import { responseAllStatusLawyerOutPut } from "../../domain/dto/all-lawyer.input";

@Resolver(Lawyer)
export class LawyerResolver {
    constructor( private readonly lawyerUseCase:LawyerUseCase){}
    
    @Mutation(()=>createLawyerOutput)
    async createLawyer(@Args('data') data:createLawyerInput){
        return this.lawyerUseCase.createdLawye(data);
    }

    @Mutation(()=>responseUpdateLawyerOutPut)
    async updateLawyer(@Args('data') data:updateLawyerInput){
        return this.lawyerUseCase.updatedLawyer(data);
    }
    
    @Mutation(()=>responseDeleteLawyerOutPut)
    async deleteLawyer(@Args('data') data:deleteLawyerInput){
        return this.lawyerUseCase.deletedLawye(data);
    }
    
    @Query(() => String)
    sayHello(): string {
        return 'Hello from CompanyResolver';
    }

    @Query(()=> responseFindIdLawyerOutPut)
    async findIdLawyer(@Args('data') data:findLawyerInput){
        return this.lawyerUseCase.findIdLawyer(data)
    }
    
    @Query(()=> responseAllStatusLawyerOutPut)
    async allStatusLawyer(){
        return this.lawyerUseCase.allStatusLawyer()
    }
    //@Query(()=> )
}
