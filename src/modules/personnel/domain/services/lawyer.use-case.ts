import { Injectable } from "@nestjs/common";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import { response } from "src/common/enum/typeResp";
import { status } from "src/common/enum/typeStatus";

@Injectable()
export class LawyerUseCase {
    constructor(
        private personRepository:PersonRepository ,
        private lawyerRepository:LawyerRepository
    ){}

    async createLawyer(data:any){
        try {
            
            if(data.phone < 8 ){
                return {
                    message:'El numero es incorrecto.' , 
                    status: response.FALL
                }
            }

            const cityId = parseInt(data.cityId);
            //console.log(cityId);
            const person = await this.personRepository.createPerson({
                ci:data.ci ,
                firstName: data.firstName ,
                lastName: data.lastName ,
                phone: data.phone ,
                address: data.address , 
                status: status.ACTIVE ,
                cityId: cityId ,
                createdAt: new Date ,
                updatedAt: new Date
            })

            if(!person){
                return {
                    message:'Surgio un problema de creacion del modelo'
                }
            }

            const lawyer = await this.lawyerRepository.createLawyer({
                userId: null ,
                personId: person.id ,
                registrationDate: new Date ,
                isActive: true,
                isFiscal: data.isFiscal ,
                isIntern: data.isIntern ,
                status:  status.ACTIVE,
                createdAt: new Date ,
                updatedAt: new Date ,
            })

            if(!lawyer){
                return {
                    message:'Surgieron problemas al crear el modelo de Abogado'
                }
            }

            return {
                message:'Registro exitoso del abogado.',
                status: response.NICE
            }

        }catch(err){
            console.log('Fallas detectadas en CrLaw y son:' + err.message)
            return {
                message: 'Fallas en CrLaw: ' + err.message,
                status:  response.WARN 

            }
        }
    }

    async updateLawyer(data:any){
        try { 

            const lawyerIds = parseInt(data.id); 

            const lawyerId = await this.lawyerRepository.findLawyerId({
                id: lawyerIds
            })

            if(!lawyerId){
                return {
                    message:'Fallas en encontrar los datos.' , 
                    status: response.FALL
                }
            }

            console.log(lawyerId);

            await this.personRepository.updatePersona({
                id:lawyerId.persona.id,
                firstName: data.firstName == null || data.firstName == '' ? lawyerId.persona.firstName : data.firstName ,
                lastName: data.lastName == null || data.lastName == '' ? lawyerId.persona.lastName : data.lastName , 
                phone: data.phone == null || data.phone == '' ? lawyerId.persona.phone : data.phone, 
                address: data.address == null || data.address == '' ? lawyerId.persona.address : data.address, 
                
            });


            await this.lawyerRepository.updateLawyer({
                id: lawyerId.id ,
                isFiscal: data.isFiscal ,
                isIntern: data.isIntern 
            })

            return {
                message: 'Actualizacion exitosa de abogado. ' ,
                status: response.NICE ,

            }

        }catch(err){
            console.log('Fallas en UpdLaw y son: ' + err.message );
            return {
                message: 'Fallas en UpdLaw y son: ' + err.message , 
                status: response.WARN
            }
        }
    }

     //querys
    async allLawyerStatus(){
        //console.log(1);
        try {
            const listLawyer = await this.lawyerRepository.allLawyerByUser()
            
            if(!listLawyer){
                return {
                    message: 'Problemas de creacion de listado' ,
                    status: response.FALL
                }
            }

            if( listLawyer.length === 0){
                return {
                    message: 'No existen listado de abogados.',
                    status: response.FALL
                }
            }

            return {
                message: 'Objeto devuelvo exitoso !!' ,
                status: response.NICE ,
                allPersLaw: listLawyer
            }

        }catch(err){
            console.log('Se presentaron fallas en AllLawSt y son: '+err.message)
            return {
                message: 'Se presentaron fallas en AllLawSt y son: '+ err.message ,
                status: response.WARN
            }
        }
    }

    async deleteLawyerStatus(data:any){
        try{

            const lawyerId = await this.lawyerRepository.findLawyerId({
                id: data.id
            })

            if(!lawyerId){
                return {
                    message:'No existen datos de abogado.',
                    status: response.FALL
                }
            }

            const personId = lawyerId?.persona.id;

            await this.personRepository.deletePersona({
                id:personId ,
                status:0
            })

            await this.lawyerRepository.deleteLawyer({
                id:lawyerId?.id,
                isActive: false ,
                status: 0
            })

            return {
                message:'Eliminacion correcta de abogado.',
                status: response.NICE 
            }

        }catch(err){
            console.log('Fallas en DelLaw y son: ' + err.message);
            return {
                message: 'Fallas en DelLaw y son: ' + err.message ,
                status: response.WARN
            }
        }
    }

    async inactiveLawyer(data:any){
        try {
            const lawyerId = await this.lawyerRepository.findLawyerId({
                id:data.id
            })

            if(!lawyerId){
                return {
                    message:'No retorna valores de abogados.',
                    status:response.FALL
                }
            }

            await this.lawyerRepository.inactiveLawyer({
                id:lawyerId.id ,
                isActive: data.isActive
            })

        }catch(err){
            console.log('Fallas de InAcLw y son: ' + err.message);
            return {
                message: 'Fallas de InAcLw y son: ' + err.message ,
                status: response.WARN
            }
        }
    }
}