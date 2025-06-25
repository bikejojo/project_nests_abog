import { Injectable } from "@nestjs/common";
import { JudgeRepository } from "../../infraestructura/prisma/judge.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import { response } from "src/common/enum/typeResp";
import { inter, isStatus, status } from "src/common/enum/typeStatus";
import { isAbsolute } from "path";


@Injectable()
export class JudgeUseCase {
    constructor(
        private juddeRepository:JudgeRepository,
        private personRepository:PersonRepository,
        private userRepository:UserRepository
    ){}

    async createJudge(data:any){
        try {
            if(data.ci < 7){
                return {
                    message:'Problemas de crear registro por CI',
                    status: response.FALL
                }
            }

            const person = await this.personRepository.createPerson({
                ci: data.ci ,
                firstName: data.firstName ,
                lastName: data.lastName ,
                phone: data.phone ,
                address: data.address ,
                status: status.ACTIVE ,
                cityId:data.cityId ,
                createdAt: new Date() ,
                updatedAt: new Date()
            })

            if(!person){
                return {
                    message:'',
                    status: response.FALL
                }
            }

            const judge = await this.juddeRepository.createJudge({
                registrationDate: data.registrationDate ,
                description: data.description ,
                isActive:  status.ACTIVE,
                isIntern : data.isIntern ,
                status: status.ACTIVE ,
                personId: person.id
            })

            if(!judge){
                return {
                    message:'',
                    status:response.FALL
                }
            }

            return {
                message:'Registro exitoso de juez',
                status:response.NICE,
                judgeDats: {
                    id:judge.id ,
                    ci:person.ci,
                    firstName: person.firstName ,
                    lastName: person.lastName,
                    phone:person.phone,
                    address: person.address,
                    registrationData: judge.registratioDate
                }
            }

        }catch(err){
            console.log('Existen fallas en CrJud y son: ' + err.message)
            return {
                message: 'Existen fallas en CrJud y son: ' + err.message ,
                status: response.WARN
            }
        }
    }

    async updateJudge(data:any){
        try{
            const judgeId = await this.juddeRepository.findedJudge(data);

            if(!judgeId){
                return {
                    message:'No se encontro los valores del modelo ',
                    status:response.FALL 
                }
            }

            const variables = {
                id: judgeId.id ,
                registrationDate: data.registratioDate ?? judgeId.registratioDate ,
                description : data.description ?? judgeId.description ,
                isActive: data.isActive ?? judgeId.isActive ,
                isIntern:data.isIntern ?? judgeId.isIntern ,
                status: data.status ?? judgeId.status 
            };

            const updateJudge = await this.juddeRepository.updatedJudge({
                id: variables.id ,
                registratioDate:variables.registrationDate ,
                description: variables.description ,
                isActive: variables.isActive ,
                isIntern: variables.isIntern ,
                status: variables.status
            })

            if(!updateJudge){
                return {
                    message:'Fallas al crear el modelo de juez.',
                    status:response.FALL
                }
            }

            const personaId = await this.personRepository.findedPersona({id:judgeId.personId});

            if(!personaId){
                return {
                    message:'Fallas al momento de encontrar el modelo de persona.',
                    status: response.FALL
                }
            }

            const variabless = {
                id: personaId.id ,
                firstName: data.firstName ?? personaId.firstName ,
                lastName: data.lastName ?? personaId.lastName ,
                phone: data.phone ?? personaId.phone ,
                address: data.address ?? personaId.address ,
                ci: data.ci ?? personaId.ci
            };

            const updatePerson = await this.personRepository.updatePersona({
                id: variabless.id,
                firstName: variabless.firstName,
                lastName:variabless.lastName,
                phone:variabless.phone,
                address:variabless.address,
                ci:variabless.ci,
            })

            if(!updatePerson){
                return {
                    message:'Fallas al actualizar el modelo de persona ',
                    status:response.FALL
                }
            }

            return {
                message: 'Actualizacion exitosa del juez. ',
                status: response.NICE,
                judgeData: {
                    id:updateJudge.id ,
                    ci:updatePerson.ci ,
                    firstName: updatePerson.firstName ,
                    lastName: updatePerson.lastName ,
                    phone: updatePerson.phone ,
                    address: updatePerson.address ,
                    registrationDate: updateJudge.registratioDate
                }
            }

        }catch(err){
            console.log('Error en UpdJud y son: '+err.message);
            return {
                message:'',
                status: response.WARN
            }
        }
    }

    async deleteJudge(data:any){
        try {
            const judge = await this.juddeRepository.findedJudge({
                id: data.id
            })

            if(!judge){
                return {
                    message:'Fallas en retornar valores al juez',
                    status: response.FALL
                }
            }

            await this.juddeRepository.deleteJudge({
                id:data.id,
                status:status.DESACTIVADO,
                isActive: isStatus.no
            })

            const persona = await this.personRepository.findedPersona({
                id: judge.personId
            })

            await this.personRepository.deletePersona({
                id: persona?.id,
                status: status.DESACTIVADO
            })

            return {
                message: 'Eliminacion correcta del juez.',
                status: response.NICE
            }
            
        }catch(err){
            console.log('Fallas en DelJud y son: ' + err.message);
            return {
                message: 'Fallas en DelJud y son: ' + err.message ,
                status: response.WARN
            }
        }
    }

    async inactiveJudge(data:any){
        try {
            const judge = await this.juddeRepository.findedJudge({
                id:data.id
            })

            if(!judge){
                return {
                    message: 'Fallas al encontrar al juez',
                    status: response.FALL
                }
            }

            await this.juddeRepository.inactiveJudge({
                id:judge.id ,
                isActive: isStatus.no
            })
            
        }catch(err){
            console.log('Fallas en InacJud y son: ' + err.message);
            return {
                message: 'Fallas en InacJud y son: ' + err.message ,
                status: response.WARN
            }
        }
    }
}