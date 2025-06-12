import { Injectable } from "@nestjs/common";
import { CityRepository } from "../../infraestructura/prisma/city.repository";

@Injectable()
export class CityUseCase {
    constructor(
        private readonly cityRepository: CityRepository
    ){}

    async listCityData(data:any){
        try {

        }catch(err){
            console.log('Las fallas en LstCity son: ' + err.message)
            return {
                message:'Las fallas en LstCity son: ' + err.message ,
                status:3
            }
        }
    }
}