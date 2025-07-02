import { Injectable } from "@nestjs/common";
import { JudgeRepository } from "../../infraestructura/prisma/judge.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import { response } from "src/common/enum/typeResp";
import { inter, isStatus, status, tatus } from "src/common/enum/typeStatus";
import { isAbsolute } from "path";
import { ResponseContext } from "src/common/responses/response-context";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { ErrorResponseStrategy } from "src/common/responses/error-response.strategy";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JudgeUseCase {
    constructor(
        private prisma: PrismaService ,
        private juddeRepository:JudgeRepository,
        private personRepository:PersonRepository
    ){}

    private ResponseContext = new ResponseContext()

    async createJudge(data:any){
        try {
            let responses={};

            if(data.ci < 7){
                return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                    type:'Problemas de crear registro por CI. ', status: response.FALL })
            }

            for(const key in data){
                if(data[key] === null || data[key] === undefined || data[key] === '' ){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                        status:response.FALL , type: data[key] })
                }
            }

            await this.prisma.$transaction(async (prisma)=>{
                const person = await this.personRepository.createPerson(prisma, {
                    ci: data.ci ,
                    firstName: data.firstName ,
                    lastName: data.lastName ,
                    phone: data.phone ,
                    address: data.address ,
                    status: tatus.ACTIVE ,
                    cityId:data.cityId ,
                    createdAt: new Date() ,
                    updatedAt: new Date()
                })

                if(!person){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                        persona:'Persona' , status: response.FALL })
                }
                //const date = new Date(data.registratioDate);
                const judge = await this.juddeRepository.createJudge(prisma, {
                    registrationDate: data.registratioDate ,
                    description: data.description ,
                    isActive:  status.ACTIVE,
                    isIntern : data.isIntern ,
                    status: tatus.ACTIVE ,
                    personId: person.id
                })

                if(!judge){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy).executeStrategy({
                        persona:'Juez', status: response.FALL })
                }

                responses = {
                    id: judge.id,
                    ci: person.ci ,
                    firstName: person.firstName ,
                    lastName: person.lastName ,
                    phone: person.phone ,
                    address: person.address ,
                    registrationDate: judge.registratioDate
                }

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({
                    type: 'Registro', message: 'de juez', status: response.NICE, content: responses
                });
            })
            
        }catch(err){
            console.log('Existen fallas en CrJud y son: ' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'CretJudg' , message: err.message, status: response.WARN
            })
        }
    }

    async updateJudge(data:any){
        try{
            for(const key in data){
                if(data[key] === null || data[key] === undefined || data[key] === '' ){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                        status:response.FALL , type: data[key] })
                }
            }

            let variables: any, variabless: any , var_:any;
            const id = parseInt(data.id)
            const judgeId = await this.juddeRepository.findedJudge({id:id});

            if(!judgeId){
               return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    persona:'Juez la Id' , status: response.FALL  })
            }

            variables = {
                id: judgeId.id ,
                registrationDate: data.registratioDate ?? judgeId.registratioDate ,
                description : data.description ?? judgeId.description ,
                isActive: data.isActive ?? judgeId.isActive ,
                isIntern:data.isIntern ?? judgeId.isIntern ,
                status: data.status ?? judgeId.status 
            }


            await this.prisma.$transaction(async (prisma) => {
                const updateJudge = await this.juddeRepository.updatedJudge(prisma,{
                    id: variables.id ,
                    registratioDate:variables.registrationDate ,
                    description: variables.description ,
                    isActive: variables.isActive ,
                    isIntern: variables.isIntern ,
                    status: variables.status
                })

                if(!updateJudge){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                        persona: 'Juez al actualizar', status: response.FALL })
                }

                            const personaId = await this.personRepository.findedPersona({id:judgeId.personId});

                if(!personaId){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                        persona: 'persona al Id', status:response.FALL })
                }

                variabless = {
                    id: personaId.id ,
                    firstName: data.firstName ?? personaId.firstName ,
                    lastName: data.lastName ?? personaId.lastName ,
                    phone: data.phone ?? personaId.phone ,
                    address: data.address ?? personaId.address ,
                    ci: data.ci ?? personaId.ci ,
                    cityId: data.cityId ?? personaId.cityId
                };

                const updatePerson = await this.personRepository.updatePersona(prisma ,{
                    id: variabless.id,
                    firstName: variabless.firstName,
                    lastName:variabless.lastName,
                    phone:variabless.phone,
                    address:variabless.address,
                    ci:variabless.ci,
                    cityId: variabless.cityId
                })

                if(!updatePerson){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                        persona:'Persona al actualizar datos' , status:response.FALL })
                }

                var_ = {
                    id:updateJudge.id ,
                    ci:updatePerson.ci ,
                    firstName: updatePerson.firstName ,
                    lastName: updatePerson.lastName ,
                    phone: updatePerson.phone ,
                    address: updatePerson.address ,
                    registrationDate: updateJudge.registratioDate ,
                    cityId: updatePerson.cityId
                }

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({
                    type:'Actualizacion', message: 'de juez', status: response.NICE , content: var_
                })
            })
           
        }catch(err){
            console.log('Error en UpdJud y son: '+err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'UpdJud', message:err.message, status:response.WARN })
        }
    }

    async deleteJudge(data:any){
        try {
            const id = parseInt(data.id);
            const judge = await this.juddeRepository.findedJudge({
                id: id
            })

            if(!judge){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    objeto:'Juez Id', status:response.FALL })
            }
            await this.prisma.$transaction(async (prisma) => {
                await this.juddeRepository.deleteJudge(prisma, {
                    id:judge.id,
                    status:tatus.INACTIVO,
                    isActive: isStatus.no
                })

                const persona = await this.personRepository.findedPersona({
                    id: judge.personId
                })

                await this.personRepository.deletePersona(prisma,{
                    id: persona?.id,
                    status: tatus.INACTIVO
                })

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type:'Eliminado' , message: 'de juez' , status:response.NICE })
            })
            
        }catch(err){
            console.log('Fallas en DelJud y son: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name: 'DelJud' , message: err.message , status:response.WARN })
        }
    }

    async inactiveJudge(data:any){
        try {
            const id = parseInt(data.id);
            const judge = await this.juddeRepository.findedJudge({ id:id })

            if(!judge){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    objeto: 'Juez Id' , status:response.FALL })
            }
            await this.prisma.$transaction(async (prisma) =>{
                await this.juddeRepository.inactiveJudge(prisma,{
                    id:judge.id ,
                    isActive: isStatus.no
                })

                return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type: 'Dado de baja' , message: 'del juez' ,status:response.NICE , content:null })
            })

        }catch(err){
            console.log('Fallas en InacJud y son: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name: 'InacJud' , message: err.message , status:response.WARN
            })
        }
    }

    async judgeActiveStatus(){
        return this.getJudgeList( () => this.juddeRepository.allJudgeActiveStatus(), 'jueces activos', 'JudActStatus' )
    }

    async judgeAll(){
       return this.getJudgeList( () => this.juddeRepository.allJudge(), 'jueces' , 'JudAll');
    }

    async judgeInactiveAll(){
        return this.getJudgeList( () => this.juddeRepository.allJudgeInactiveStatus(), 'jueces inactivos' , 'JudInactStat')
    }

    private async getJudgeList(fetchMethod: ()=> Promise<any>,successMessage:string , warningName:string){
        try {
            const allJudge = await fetchMethod();
            
            if (!allJudge || allJudge.length === 0) {
                return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({ type: 'No se encontraron datos de listado de juez.', status: response.FALL });
            }

            const allJudges = allJudge.map(judge => ({
                id: judge.id,
                fullName: `${judge.persona.firstName} ${judge.persona.lastName}`,
                ci: judge.persona.ci,
                address: judge.persona.address
            }));

            return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({ type: 'Listado', message: successMessage, status: response.NICE, content: allJudges });

        }catch(err){
            console.log(`[WARN] Fallas en ${warningName} y son: ` + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({ name: warningName, message: err.message, status: response.WARN });
        }
    }
}