import { Mutation , Query , Args , Resolver } from "@nestjs/graphql";
import { city } from "../entities/city.entity";
import { CityUseCase } from "../domain/services/city.use-case";
import { AllCityDataOutPut } from "../domain/dto/all-city.input";

@Resolver(()=>city)
export class CityResolver {
    constructor( private readonly cityUseCase:CityUseCase ){}

    @Query(()=>AllCityDataOutPut)
    async allCityData(){
        return await this.cityUseCase.listCityData();
    }
}