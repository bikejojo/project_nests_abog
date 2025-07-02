import { Injectable } from "@nestjs/common";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer.repository";
import { response } from "src/common/enum/typeResp";
import { status, tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { ErrorResponseStrategy } from "src/common/responses/error-response.strategy";
import { DataResponseStrategy } from "src/common/responses/data-response.strategy";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LawyerUseCase {
    constructor(
        private prisma: PrismaService ,
        private personRepository:PersonRepository ,
        private lawyerRepository:LawyerRepository
    ){}

    private ResponseContext = new ResponseContext();

    async createLawyer(data:any){
        try {
            
            if(data.phone < 8 ){
                return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                    message:'Registro incorecto de telefono en persona' , status:response.FALL })
            }
            await this.prisma.$transaction(async (prisma)=>{
                const cityId = parseInt(data.cityId);
                const person = await this.personRepository.createPerson(prisma,{
                    ci:data.ci ,
                    firstName: data.firstName ,
                    lastName: data.lastName ,
                    phone: data.phone ,
                    address: data.address , 
                    status: tatus.ACTIVE,
                    cityId: cityId ,
                    createdAt: new Date ,
                    updatedAt: new Date
                })

                if(!person){
                    return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({
                        type:'Surgio un  problema en persona ID' , status:response.FALL })
                }

                const lawyer = await this.lawyerRepository.createLawyer(prisma,{
                    userId: null ,
                    personId: person.id ,
                    registrationDate: new Date ,
                    isActive: true,
                    isFiscal: data.isFiscal ,
                    isIntern: data.isIntern ,
                    status:  tatus.ACTIVE,
                    createdAt: new Date ,
                    updatedAt: new Date ,
                })

                if(!lawyer){
                    return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                        objeto: 'abogado para crear un registro ' , status: response.FALL })
                }

                return {
                    message:'Registro exitoso del abogado.',
                    status: response.NICE
                }
            })
           
        }catch(err){
            console.log('Fallas detectadas en CrLaw y son:' + err.message)
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'CrLaw' , message: err.message , status:response.WARN })
        }
    }

    async updateLawyer(data:any){
        try { 

            const lawyerIds = parseInt(data.id); 

            const lawyerId = await this.lawyerRepository.findLawyerId({
                id: lawyerIds
            })

            if(!lawyerId){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    objeto:'abogado ID' , status:response.FALL
                });
            }
            //console.log(lawyerId);
            await this.prisma.$transaction(async (prisma)=> {
                await this.personRepository.updatePersona(prisma, {
                    id:lawyerId.persona.id,
                    firstName: data.firstName == null || data.firstName == '' ? lawyerId.persona.firstName : data.firstName ,
                    lastName: data.lastName == null || data.lastName == '' ? lawyerId.persona.lastName : data.lastName , 
                    phone: data.phone == null || data.phone == '' ? lawyerId.persona.phone : data.phone, 
                    address: data.address == null || data.address == '' ? lawyerId.persona.address : data.address, 
                });

                await this.lawyerRepository.updateLawyer(prisma,{
                    id: lawyerId.id ,
                    isFiscal: data.isFiscal ,
                    isIntern: data.isIntern 
                })
            });
            
            return {
                message: 'Actualizacion exitosa de abogado. ' ,
                status: response.NICE ,
            }

        }catch(err){
            console.log('Fallas en UpdLaw y son: ' + err.message );
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'WpdLaw' , message:err.message  , status:response.WARN })
        }
    }

    async deleteLawyerStatus(data:any){
        try{

            const lawyerId = await this.lawyerRepository.findLawyerId({
                id: data.id
            })

            if(!lawyerId){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    objeto:'abogado de su ID' , status:response.FALL })
            }

            const personId = lawyerId?.persona.id;
            await this.prisma.$transaction(async(prisma)=>{
                await this.personRepository.deletePersona(prisma,{
                    id:personId ,
                    status:0
                })

                await this.lawyerRepository.deleteLawyer(prisma,{
                    id:lawyerId?.id,
                    isActive: false ,
                    status: 0
                })

                return {
                    message:'Eliminacion correcta de abogado.',
                    status: response.NICE 
                }
            })

        }catch(err){
            console.log('Fallas en DelLaw y son: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({ name:'DelLar', message:err.message , status:response.WARN })
        }
    }

    async inactiveLawyer(data:any){
        try {
            const lawyerId = await this.lawyerRepository.findLawyerId({
                id:data.id
            })

            if(!lawyerId){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    objeto:'abogado el ID' , status:response.FALL });
            }
            await this.prisma.$transaction(async (prisma) => {
                await this.lawyerRepository.inactiveLawyer(prisma,{
                    id:lawyerId.id ,
                    isActive: data.isActive
                })
            })
            

        }catch(err){
            console.log('Fallas de InAcLw y son: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({
                name:'InAcLw' , message:err.message , status: response.WARN })
        }
    }

     //querys
    
    

    async allLawyerStatus(){
        // const listLawyer = await this.lawyerRepository.allLawyerByUser()
        return this.dataLawyerResp(()=> this.lawyerRepository.allLawyerByUser(),'Abogados','AllLawStat');
    }

    async lawyerActStat(){
        return this.dataLawyerResp( () => this.lawyerRepository.allLawyerActStat(),'Abogados','LawActStat');
    }
    async lawyerInactStat(){
        return this.dataLawyerResp( () => this.lawyerRepository.allLawyerInactStat() , 'Abogados' ,'LawInacStat' );
    }

    private async dataLawyerResp(fetchMethod: () => Promise<any>,succesMessage:string , warningName:string){
        try {
            const allLawyer = await fetchMethod();

            if(!allLawyer || allLawyer.length === 0){
                return this.ResponseContext.setStrategy(new DataResponseStrategy()).executeStrategy({type:'No se encuentra ID s de abogados' , status:response.FALL})
            }

            const allLaywers = allLawyer.map(lawyer => ({
                id:lawyer.id ,
                fullName:` ${lawyer.persona.firstName} ${lawyer.persona.lastName} ` ,
                status: lawyer.status
            }))

            return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Listado',message:succesMessage , status:response.NICE , content:allLaywers})

        }catch(err){
            console.log(`[WARN] Fallas en ${warningName} y son: ` + err.message );
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({ name: warningName, message: err.message, status: response.WARN })
        }
    }
}