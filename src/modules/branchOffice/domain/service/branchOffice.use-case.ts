import { Injectable } from "@nestjs/common";
import { BranchOfficeRepository } from "../../infraestructura/prisma/branchOffice.repository";
import { status } from "src/common/enum/typeStatus";
import { response } from "src/common/enum/typeResp";

@Injectable()
export class BranchOfficeUseCase {
    constructor(
        private readonly cityRepository: BranchOfficeRepository
    ){}

    async listCityData(){
        try {
            const branch = await this.cityRepository.listCity();

            if( !branch ){
                return {
                    message: 'Error al traer los datos de ciudades.', 
                    status: response.FALL
                }
            }

            if( branch.length === 0 ){
                return {
                    message: 'No existen datos de ciudades.' ,
                    status: response.FALL
                }
            }

            return {
                message: 'Retorno valores exitoso. !!',
                status: response.NICE,
                allBranchOffice: branch
            }
        }catch(err){
            console.log('Las fallas en LstBrnch son: ' + err.message)
            return {
                message:'Las fallas en LstBrnch son: ' + err.message ,
                status:response.WARN
            }
        }
    }
}