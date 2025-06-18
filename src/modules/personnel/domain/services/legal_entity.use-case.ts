import { Injectable } from "@nestjs/common";
import { LegalEntityRepository } from "../../infraestructura/prisma/legal_entity.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { response } from "src/common/enum/typeResp";
import { status } from "src/common/enum/typeStatus";

@Injectable()
export class LegalEntityUseCase {
    constructor(
        private legalEntityRepoository:LegalEntityRepository,
        private personRespository: PersonRepository
    ){}

    async createLegalEntity(data:any){
        try {
            if(data.phone < 8){
                return {
                    message: 'El numero es incorrecto.',
                    status: response.FALL
                }
            }

            const person = await this.personRespository.createPerson({
                ci: data.ci,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                address: data.address,
                status: status.ACTIVE,
                city: data.cityId,
                createdAt: new Date(),
                updatedAt: new Date()
            })

            if(!person){
                return {
                    message: 'Surgio un problema de creacion del modelo',
                    status: response.FALL
                }
            }

            const legalEntity = await this.legalEntityRepoository.createLegalEntity({
                NIT: data.NIT,
                companyName: data.companyName,
                address: data.address,
                registrationDate: new Date(),
                legalRepresentative: data.legalRepresentative,
                typeCompany: data.typeCompany,
                personId: person.id,
                status: status.ACTIVE,
            })

            if(!legalEntity){
                return {
                    message: 'Surgieron problemas al crear el modelo de Entidad Legal',
                    status: response.FALL
                }

            }

            return {
                message: 'Entidad Legal creada correctamente',
                status: response.NICE,
                data: legalEntity
            }

        }catch (err) {
            console.log('Error en CrtLegEnt: ', err.message);
            return {
                message:'Error en CrtLegEnt y son: ' + err.message,
                status: response.WARN 
            }
        }
    }
}