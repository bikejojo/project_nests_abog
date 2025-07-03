import { Injectable } from "@nestjs/common";
import { CityRepository } from "../../infraestructura/prisma/city.repository";
import { ResponseContext } from "src/common/responses/response-context";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { response } from "src/common/enum/typeResp";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";

@Injectable()
export class CityUseCase {
    constructor(
        private readonly cityRepository: CityRepository
    ){}

    private responseContext = new ResponseContext();
    async listCityData(){
        try {
            const city = await this.cityRepository.listCity();

            if( !city ){
                return this.responseContext.setStrategy(new DataResponseStrategy()).executeStrategy({type:'ID de ciudad',status:response.FALL});
            }

            if( city.length === 0 ){
                return this.responseContext.setStrategy(new DataResponseStrategy()).executeStrategy({type:'No existe listado de ciudades',status:response.FALL})            
            }

            return this.responseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Listado' , message:'ciudades',status:response.NICE })

        }catch(err){
            console.log('Las fallas en LstCity son: ' + err.message)
            return this.responseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({name:'LstCity',message:err.message , status:response.WARN})
        }
    }
}