import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";

@Injectable()
export class LawyerUseCase {
    constructor(
        private userRepository:UserRepository ,
        private personRepository:PersonRepository ,
        private lawyerRepository:LawyerRepository
    ){}

    async createLawyer(data:any){
        try {
            
        }catch(err){
            console.log('Fallas detectadas en CrLaw y son:' + err.message)
            return {
                message: 'Fallas en CrLaw: ' + err.message,
                status: 3 , 

            }
        }
    }
}