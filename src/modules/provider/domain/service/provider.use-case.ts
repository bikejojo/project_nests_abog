import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'
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
        }catch(err){
            return {
                message: 'Presentaron las fallas CrPr son: ' + err.message ,
                status: 501
            }
        }
    }

    async updateProvider(data:any){

    }

    async deleteProvider(data:any){

    }

    assingTypeProvider(type:number){
        switch(type){
            case 1: return "Individual";
            case 2: return "Empresa";
            default: return "Libre"
        }
    }


}