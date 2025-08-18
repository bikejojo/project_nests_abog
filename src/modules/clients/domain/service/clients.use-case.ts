import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { AuthService } from "src/auth/auth.service";
import { ClientRepository } from "../../infraestructura/prisma/clients.repository";
import { PersonRepository } from "src/modules/personnel/infraestructura/prisma/persona.repository";
import { Prisma } from "@prisma/client";
import { tatus } from "src/common/enum/typeStatus";

@Injectable()
export class ClientsUseCase{
    constructor(
        private clientRepository: ClientRepository,
        private personRepository: PersonRepository ,
        private prisma:PrismaService

    ){}
    
    async createClient(data:any){
        try{
            let variables = {
                ci: data.ci,
                firstName: data.firstName,
                lastName: data.lastName,
                NIT: data.NIT,
                phone: data.phone,
                email: data.email,
                address:data.address,
                isActive:true,
                cityId:data.cityId,
            }


            const result = await this.prisma.$transaction(async (prisma) => {
                const persona = await this.personRepository.createPerson(prisma,{
                    ci:variables.ci,
                    firstName: variables.firstName ,
                    lastName: variables.lastName ,
                    phone:variables.phone,
                    address: variables.address ,
                    status: tatus.ACTIVE,
                    cityId: variables.cityId ,
                    createdAt: new Date() ,
                    updatedAt: new Date()
                })

                const client = await this.clientRepository.createdClients({
                    personId: persona.id,  // Relacionamos con la persona creada
                    NIT: variables.NIT,
                    email: variables.email,
                    isActive: variables.isActive,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                
                return { persona, client };
            })

            

        return {
            message:'creacion exitosa del client',
            status:201,
            createClient:{
                client: result.client,
                person: result.persona
            }
        }
        }catch(err){
            console.log('[LOG] siguientes problemas:' + err.message)
            return {
                message:'Se presento en ClCre son: '+ err.message ,
                status:501,
            }
        }
    }
    async updateClient(data:any){
        try{
            const clientVerification = this.clientRepository.findIdClients(data.id);
            if(!clientVerification){
                return{
                    message:'Objeto de client no encontrado',
                    status:301
                }
            }

            const clients = this.clientRepository.updatedClients({
                firstName: data.firstName,
                lastName: data.lastName,
                NIT: data.NIT,
                phone: data.phone,
                email: data.email,
                address:data.address,
                isActive:true,
                status: 1
            });

            return {
                messge:'Actualizacion exitos de cliente',
                status:201,
                updateClient:clients
            }

        }catch(err){
            console.log('[LOG] siguientes problemas:' + err.message)
            return {
                message:'Se presento en UpdCl son: '+ err.message ,
                status:501,
            }
        }
    }
    async deleteClient(data:any){
        try {
            const verificationClient = await this.clientRepository.findIdClients(data);
            if(verificationClient?.status === 0 ){
                return {
                    message:'Este objeto se encuentra en deshabilidato',
                    status:301
                }
            }

            const clients = await this.clientRepository.deletedClients(data);

            if(!clients){
                return {
                    message:'Surgio un problema con el objeto ',
                    status:401
                }
            }

            return {
                message:'Creacion exitosa del cliente',
                status:201,
                deleteClient:clients
            }

        } catch(err){
            console.log('[LOG] se presenta las siguientes fallas son: ' + err.message)
            return {
                message:'Se presentaron fallas UpdCli son: ' + err.message,
                status: 501 ,
            }
        }
    }
    async findIdClient(data:any){
        try{
            const clients = await this.clientRepository.findIdClients(data);

            if(!clients){
                return {
                    message:'No se encontro el objeto escogido.',
                    status:401
                }
            }

            return{
                message:'Excelente se encontro el objeto',
                status: 201,
                findClient:clients
            }

        }catch(err){
            console.log('[LOG] Se presentaron los siguientes eerrores :' + err.message )
            return {
                message: 'En FndIdCl se presentaron fallas: ' + err.message,
                status: 501
            }
        }
    }
    async allClient(){
        const allClients = await this.clientRepository.allClients();
        if(!allClients){
            return{
                message:'objeto con problemas de conexiones.',
                status:301
            }
        }

        return{
            message:'Consulta exitosa',
            status:201,
            allClients:allClients
        }
    }
}