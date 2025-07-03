import { Injectable } from "@nestjs/common";
import { BranchOfficeRepository } from "../../infraestructura/prisma/branchOffice.repository";
import { status } from "src/common/enum/typeStatus";
import { response } from "src/common/enum/typeResp";
import { ResponseContext } from "src/common/responses/response-context";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";

@Injectable()
export class BranchOfficeUseCase {
    constructor(
        private readonly cityRepository: BranchOfficeRepository
    ){}

    private ResponseContent = new ResponseContext();

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
                return this.ResponseContent.setStrategy(new DataResponseStrategy()).executeStrategy({type:'Sucursal',status:response.FALL});
            }

            return this.ResponseContent.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Creacion',message:'Sucursales', status:response.NICE}); 
        }catch(err){
            console.log("Fallas en CrBrOff" + err.message);
            return this.ResponseContent.setStrategy(new WarningResponseStrategy()).executeStrategy({ name:'CrBrOff', message:err.message , status:response.WARN})
        }
    }


    async updatedBranchOffice(data:any){
        try{ 
            const branchOfficeId = await this.cityRepository.findIdBranchOffices({
                id:data.id
            })

            if(!branchOfficeId){
                return this.ResponseContent.setStrategy(new DataResponseStrategy()).executeStrategy({type:'La ID de sucursal',status:response.FALL})   
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
                return this.ResponseContent.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'La ID de sucursal' , status: response.FALL })
            }

            return this.ResponseContent.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Modificacion',message:'de sucursales',status:response.NICE}) 

        }catch(err){
            console.log('Fallas en UpdBrchOff y son: '+err.message)
            return this.ResponseContent.setStrategy(new WarningResponseStrategy()).executeStrategy({ name:'UpdBrchOff', message:err.message , status:response.WARN })
        }
    }
}