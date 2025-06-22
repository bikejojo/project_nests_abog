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

    async createdBranchOffice(data:any){
        try{
            const branchOffice = await this.cityRepository.createBranchOffices({
                cityId: data.cityId ,
                name: data.name ,
                address: data.address ,
                phone: data.phone ,
                email: data.email ,
            })

            if(!branchOffice){
                return {
                    message: 'No se creo con exito la sucursal' ,
                    status: response.FALL
                }
            }

            return {
                message:'Exito en crear la sucursal',
                status:response.NICE ,
                dataBranchOffice:branchOffice
            }
        }catch(err){
            console.log("Fallas en CrBrOff" + err.message);
            return {
                message:'Fallas en CrBrOff' + err.message ,
                status: response.WARN ,
            }
        }
    }


    async updatedBranchOffice(data:any){
        try{ 
            const branchOfficeId = await this.cityRepository.findIdBranchOffices({
                id:data.id
            })

            if(!branchOfficeId){
                return {
                    message:'Valores null',
                    status: response.FALL
                }
            }

            const updateBranchOffice = this.cityRepository.updateBranchOffices({
                id:branchOfficeId.id,
                name: data.name ,
                address: data.address ,
                phone: data.phone ,
                email: data.email ,
                cityId: data.cityId
            })

            if(!updateBranchOffice){
                return {
                    message:'Valores nulos en sucursales.',
                    status: response.FALL ,
                    
                }
            }

            return {
                message:'Actualizacion correcta de sucursal',
                status:response.NICE ,
                dataBranchOffice: updateBranchOffice
            }
        }catch(err){
            console.log('Fallas en UpdBrchOff y son: '+err.message)
            return {
                message: 'Fallas en UpdBrchOff y son: '+err.message ,
                status: response.WARN
            }
        }
    }
}