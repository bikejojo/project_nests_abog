import { Injectable } from "@nestjs/common";
import { CityRepository } from "../../infraestructura/prisma/city.repository";

@Injectable()
export class CityUseCase {
    constructor(
        private readonly cityRepository: CityRepository
    ){}

    async listCityData(){
        try {
            const city = await this.cityRepository.listCity();

            if( !city ){
                return {
                    message: 'Error al traer los datos de ciudades.', 
                    status: 1
                }
            }

            if( city.length === 0 ){
                return {
                    message: 'No existen datos de ciudades.' ,
                    status: 1
                }
            }

            return {
                message: 'Retorno valores exitoso. !!',
                status: 2,
                allCity: city
            }
        }catch(err){
            console.log('Las fallas en LstCity son: ' + err.message)
            return {
                message:'Las fallas en LstCity son: ' + err.message ,
                status:3
            }
        }
    }
}