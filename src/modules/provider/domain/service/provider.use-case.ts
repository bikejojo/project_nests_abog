import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { ProviderRepository } from "../../infraestructur/prisma/provider.repository";

@Injectable()
export class ProviderUseCase {
    constructor(
        private providerRepository : ProviderRepository
    ){}

    async createProvider (data:any){
        try {
            const provider = await this.providerRepository.createProvider({
                firstName: data.firstName,
                lastName: data.lastName,
                NIT: data.NIT,
                phone: data.phone,
                email: data.email,
                address:data.address,
                typeProvider: this.assingTypeProvider(data.typeProvider),
                isActive:true,
                status: 1
            })

            if(!provider){
                return {
                    message:'Surgio un problema al crear al provedor.',
                    status:301
                }
            }

            return{
                message:'Se creo con exito!',
                status:201,
                provider: provider
            }
        }catch(err){
            return {
                message: 'Presentaron las fallas CrPr son: ' + err.message ,
                status: 501
            }
        }
    }

    async updateProvider(data:any){
        try {
            const providerModel = this.providerRepository.findIdProvider(data.id);
            if(!providerModel){
                return {
                    message: 'No existe el objeto.',
                    status: 301
                }
            }

            const provider = this.providerRepository.updateProvider({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                NIT: data.NIT,
                phone: data.phone,
                email: data.email,
                address:data.address,
                typeProvider: this.assingTypeProvider(data.typeProvider),
                isActive:true,
                status: 1
            });

            if(!provider){
                return {
                    message:'Surgio problemas al actualizar' ,
                    status: 302
                }
            }

            return {
                message:'Actualizacion existosa en el objeto' ,
                status: 201 ,
                updateProvider:provider
            }
        }catch(err){
            return{
                message: 'Surgio problemas en UpdPr son: ' + err.message,
                status:501
            }
        }
    }

    async deleteProvider(data:any){
        try {
            const consultant = await this.providerRepository.findIdProvider(data.id);

            if(consultant?.status === 0){
                return {
                    message:'Este proveedor ya fue dado de baja.',
                    status: 202
                }
            }

            const provider = await this.providerRepository.deleteProvider(data.id)

            if(!provider){
                return {
                    message:'Surgio fallas al encontrar al proveedor.',
                    status:401
                }
            }

            return {
                message: 'Proveedor eliminado exitoso',
                status:201,
                deleteProvider:provider
            }

        }catch(err){
            return {
                message:'Surgieron errores DelPr son :' + err.message,
                status: 501
            }
        }

    }

    assingTypeProvider(type:number){
        switch(type){
            case 1: return "Individual";
            case 2: return "Empresa";
            default: return "Libre"
        }
    }

    async findInProvider(data:any){
        return await this.providerRepository.findIdProvider(data.id)
    }

    async allProviderStatus(){
        return this.providerRepository.allStatusProvider;
    }
}