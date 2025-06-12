import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class personaUseCase {
    constructor(
        private userRepository:UserRepository ,
        private personRepository:PersonRepository ,
        private lawyerRepository:LawyerRepository
    ){}

    async createPersonLawyer(data:any){
        try {
            
            if(data.ci < 7){
                return {
                    message:'Su ci debe tener almenos 7 digitos',
                    status: 1
                }
            }

            if(data.phone < 8 ){
                return {
                    message: 'El numero de telefono esta mal.' ,
                    status: 1
                }
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await this.userRepository.createUser({
                name:`${data.firstName}_${data.lastName}` ,
                email: data.email ,
                ci: data.ci , 
                password: hashedPassword ,
                isActive: true,
                status: 1,
                type: 1 ,
                token: '' ,
            })

            if(!user){
                return{
                    message:'El registro de user fue incorrecto !!!' ,
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
                return{
                    message:'El registro de person fue incorrecto !!!' ,
                    status: 1
                }
            }

            const lawyer = await this.lawyerRepository.createLawyer({
                userId: user.id ,
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
                return{
                    message:'El registro de Lawyer fue incorrecto !!!' ,
                    status: 1
                }
            }
            
            return {
                message: 'registro existoso de abogado. !!!',
                status: 2,
                personLawyUser: {
                    userData: user ,
                    personData: person ,
                    lawyerData: lawyer,
                }
            }
        }catch(err){
            console.log('Fallas detectadas en CrPers y son:' + err.message)
            return {
                message: 'Fallas en CrPers: ' + err.message,
                status: 3 , 

            }
        }
    }


}