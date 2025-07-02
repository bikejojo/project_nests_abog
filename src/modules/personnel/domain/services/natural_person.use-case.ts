import { Injectable } from "@nestjs/common";
import { NaturalPersonRepository } from "../../infraestructura/prisma/natural_person.repository";
import { response } from "src/common/enum/typeResp";
import { status , tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { first } from "rxjs";
import { ErrorResponseStrategy } from "src/common/responses/error-response.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NaturalPersonUseCase{
    constructor(
        private readonly prisma: PrismaService ,
        private readonly naturalPersonRepository: NaturalPersonRepository ,
        private readonly personRepository: PersonRepository
    ){}
    private ResponseContext = new ResponseContext()

    async createdNaturalPerson(data:any){
        try {
            const variables = {
                ci: data.ci ,
                firstName: data.firstName ,
                lastName: data.lastName ,
                phone: data.phone ,
                address : data.address ,
                registrationData: data.registrationData ,
                description: data.description ,
                status: tatus.ACTIVE ,
                cityId: data.cityId
            }
            await this.prisma.$transaction(async (prisma) => {
                const person = await this.personRepository.createPerson(prisma,{
                    ci: variables.ci ,
                    firstName: variables.firstName ,
                    lastName: variables.lastName ,
                    phone: variables.phone ,
                    address: variables.address ,
                    status: variables.status ,
                    cityId: variables.cityId ,
                    createdAt: new Date() ,
                    updatedAt: new Date() ,
                })

                if(!person){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'Creacion de Persona con fallas' , status: response.FALL })
                }

                const naturalPerson = await this.naturalPersonRepository.createNaturalPerson(prisma, {
                    registrationDate: variables.registrationData ,
                    description : variables.description ,
                    status: variables.status ,
                    personId: person.id
                })

                if(!naturalPerson){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'Tiene fallas la creacion de Persona Natural' , status:response.FALL   })
                };

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type:'Registro',message:'de Personal Natural' , status:response.NICE , content: null });

            })            
        }catch(err){
            console.log('Fallas en CrtNatPer y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'CrtNatPer' , message:err.message , status:response.WARN })
        }
    }

    async updateNaturalPerson(data:any){
        try {
            const personNaturalId = parseInt(data.id)
            await this.prisma.$transaction(async (prisma) => {
                const personNaturalFind = await this.naturalPersonRepository.findIdNaturalPerson({
                    id:personNaturalId
                })

                if(!personNaturalFind){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'Falas en busqueda de ID Persona Natural' , status:response.FALL })
                }

                const personNatural = await this.naturalPersonRepository.updateNaturalPerson(prisma,{
                    id:personNaturalFind.id ,
                    registrationDate: data.registrationDate ?? personNaturalFind.registrationDate ,
                    description: data.description ?? personNaturalFind.description , 
                    status: tatus.ACTIVE
                })

                const person = await this.personRepository.updatePersona(prisma,{
                    id:personNatural.id , 
                    firstName: data.firstName ,
                    lastName: data.lastName ,
                    phone: data.phone ,
                    address: data.address ,
                    cityId: data.cityId
                })

                if(!person){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'Fallas en la actualizacion de Persona' , status: response.FALL })
                }

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type:'Actualizacion' , message:'de persona natural' ,status:response.NICE , response:null })
       
            })
            
            }catch(err){
            console.log('[WARN] Fallas en UpdNatPer y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'UpdNatPer' , message:err.message , status:response.WARN })
        }
    }

    async deleteNaturalPerson(data:any){
        try {
            const naturalPersonId = parseInt(data.id);
            const naturalPersons = await this.naturalPersonRepository.findIdNaturalPerson({
                id: naturalPersonId
            })

            if(!naturalPersons){
                return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type:'ID de persona Natural no encontrado.' ,status:response.FALL })
            }

            await this.prisma.$transaction(async (prisma) => {
                await this.naturalPersonRepository.deleteNaturalPerson(prisma,{
                    id: naturalPersons.id , status: tatus.INACTIVO
                })

                await this.personRepository.deletePersona(prisma,{
                    id:naturalPersons.personId , status:tatus.INACTIVO
                })

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Eliminado' , message:'de personal natural' , status:response.NICE })

            }) 

        }catch(err){
            console.log('[WARN] Fallas en delNatPer y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'delNatPer' , message:err.message , status:response.WARN })
        }
    }
}