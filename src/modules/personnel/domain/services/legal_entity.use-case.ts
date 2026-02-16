import { Injectable } from "@nestjs/common";
import { LegalEntityRepository } from "../../infraestructura/prisma/legal_entity.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { response } from "src/common/enum/typeResp";
import { status, tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { city } from "src/modules/city/entities/city.entity";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { ErrorResponseStrategy } from "src/common/responses/error-response.strategy";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class LegalEntityUseCase {
    constructor(
        private prisma: PrismaService ,
        private legalEntityRepoository:LegalEntityRepository,
        private personRespository: PersonRepository
    ){}

    private ResponseContext = new ResponseContext();
    
    async createLegalEntity(data:any){
        let person :any = null;
        let legalEntity :any = null;

        try {
            if(data.phone.length < 9 ){
                return {
                    message: 'El numero es incorrecto.',
                    status: response.FALL
                }
            }

            const result = await this.prisma.$transaction(
                async (tx) => {
                    // ✅ 4. CREAR PERSONA - ORDEN DE PARÁMETROS CORREGIDO
                    person = await this.personRespository.createPerson({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phone: data.phone,
                        address: data.address,
                        status: tatus.ACTIVE,
                        cityId: data.cityId, 
                    }, tx);


                    legalEntity = await this.legalEntityRepoository.createLegalEntity(
                    {
                        NIT: data.NIT,
                        companyName: data.companyName,
                        address: data.address,
                        registrationDate: new Date(),
                        legalRepresentative: data.legalRepresentive, 
                        typeCompany: data.typeCompany,
                        personId: person.id,
                        status: tatus.ACTIVE,
                    }, tx);

                    return {
                        person,
                        legalEntity: {
                            ...legalEntity,
                            person: person
                        },
                        success: true,
                        executionTime: Date.now()
                    };
                }, 
            )       
        }catch (err) {
            console.log('Error en CrtLegEnt: ', err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'CrtLegEnt' , message:err.message , status: response.WARN })
        }
    }

    async updateLegalEntity(data:any){
        try {
            await this.prisma.$transaction(async (prisma)=> {
                const legalEntityId = await this.legalEntityRepoository.findIdLegalEntity({
                    id: data.id
                })

                if(!legalEntityId){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'Fallas al encontrar valors de legalEntity su ID',status:response.FALL })
                }

                const legalEntity = await this.legalEntityRepoository.updateLegalEntity(prisma, {
                    id:legalEntityId.id , 
                    NIT: data.NIT ,
                    companyName: data.companyName ,
                    address: data.address ,
                    registrationData: data.registrationDate ,
                    legalRepresentive: data.legalRepresentive ,
                    typeCompany: data.typeCompany
                })
                
                const personId = await this.personRespository.findedPersona({
                    id: legalEntity.personId
                })

                if(!personId){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                        type: 'ID persona no encontrado.' , status: response.FALL    })
                }

                const person = await this.personRespository.updatePersona(prisma,{
                    id: personId.id ,
                    firstName: data.firstName, 
                    lastName: data.lastName,
                    phone: data.phone,
                    address: data.address,
                    cityId: data.cityId
                })

                if(!person){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                        type: 'Error en persona ID' , status: response.FALL  })
                }

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type: 'Actualizacion' , message:' de Entidad Legal' , status:response.NICE })
       
            })
        } catch(err) {
            console.log('[WARNING] Fallas en UptLegEnt y son: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({ name: 'UptLegEnt' , message: err.message , status: response.WARN });
        }
    }

    async deleteLegalEntity(data:any){
        try {
            await this.prisma.$transaction(async (prisma) => {
                const legalEntityId = await this.legalEntityRepoository.findIdLegalEntity({
                    id:data.id
                })

                if(!legalEntityId){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'No se encontro datos de la entidad.' , status:response.FALL })
                }

                const legalEntity = await this.legalEntityRepoository.deleteLegalEntity(prisma,{
                    id:legalEntityId.id,
                    status: tatus.INACTIVO
                })

                if(!legalEntity){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'No se genero el cambio' , status:response.FALL })
                }

                const personId = await this.personRespository.findedPersona({
                    id:legalEntity.personId
                })

                 if(!personId) {
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({type:'No se encontro ID de persona',status:response.FALL}) 
                }

                const person = await this.personRespository.deletePersona(prisma,{
                    id:personId.id , status: tatus.INACTIVO
                })

                if(!person){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                        objeto:'Persona en eliminar ',status:response.FALL
                    })
                }

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type:'Eliminado',message:'de entidad legal',status:response.NICE})

            })
           
        }catch(err){
            console.log();
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name: 'DelLegEnt' , message:err.message , status: response.WARN 
            })
        }
    }

}

@Injectable()
export class LegalEntityList {
    constructor(
        private prisma: PrismaService ,
        private legalEntityRepoository:LegalEntityRepository,
        private personRespository: PersonRepository
    ){}

    private ResponseContext = new ResponseContext();
}