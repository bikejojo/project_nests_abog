import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";

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
                    status: 1
                }
            }

            const person = await this.personRepository.createPerson({
                ci:data.ci ,
                firstName: data.firstName ,
                lastName: data.lastName ,
                phone: data.phone ,
                address: data.address , 
                status: 1,
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
                status: 1 ,
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
                status:2
            }

        }catch(err){
            console.log('Fallas detectadas en CrLaw y son:' + err.message)
            return {
                message: 'Fallas en CrLaw: ' + err.message,
                status: 3 , 

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
                    status: 1
                }
            }

            if( listLawyer.length === 0){
                return {
                    message: 'No existen listado de abogados.',
                    status: 1
                }
            }

            return {
                message: 'Objeto devuelvo exitoso !!' ,
                status: 2 ,
                allPersLaw: listLawyer
            }

        }catch(err){
            console.log('Se presentaron fallas en AllLawSt y son: '+err.message)
            return {
                message: 'Se presentaron fallas en AllLawSt y son: '+ err.message ,
                status:3
            }
        }
    }
}