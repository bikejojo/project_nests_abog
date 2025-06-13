import { Injectable } from "@nestjs/common";
import { JudgeRepository } from "../../infraestructura/prisma/judge.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import { response } from "src/common/enum/typeResp";


@Injectable()
export class JudgeUseCase {
    constructor(
        private juddeRepository:JudgeRepository,
        private personRepository:PersonRepository,
        private userRepository:UserRepository
    ){}

    async createJudge(data:any){
        try {

        }catch(err){
            console.log('Existen fallas en CrJud y son: ' + err.message)
            return {
                message: 'Existen fallas en CrJud y son: ' + err.message ,
                status: response.WARN
            }
        }
    }
}