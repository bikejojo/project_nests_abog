import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { AuthService } from "src/auth/auth.service";
import { ClientRepository } from "../../infraestructura/prisma/clients.repository";
import { PersonRepository } from "src/modules/personnel/infraestructura/prisma/persona.repository";
import { Prisma } from "@prisma/client";
import { status, tatus } from "src/common/enum/typeStatus";
import { createClientsInput } from "../dto/create-clients.input";
import { updateClientInput } from "../dto/update-clients.input";
import { deleteClientInput } from "../dto/delete-clients.input";

@Injectable()
export class ClientsUseCase{
    constructor(
        private clientRepository: ClientRepository,
        private personRepository: PersonRepository ,
        private prisma:PrismaService

    ){}
    
    async createClient(data:createClientsInput){
        let persona:any = null;
        let client:any = null;

        try{
            const result = await this.prisma.$transaction(
                async (tx) => {
                    persona = await this.personRepository.createPerson({
                        firstName: data.firtName,
                        lastName: data.lastName,
                        phone: data.phone,
                        address: data.address,
                        status: tatus.ACTIVE,
                        cityId: 1

                    }, tx);

                    client = await this.clientRepository.createdClients({
                        personId: persona.id,
                        NIT: data.NIT,
                        email: data.email,
                        isActive: status.ACTIVE,
                        cellphone: data.phone, 
                        isIntern: status.ACTIVE, 
                        status: tatus.ACTIVE // Añadido si es requerido
                    }, tx);

                    return { persona, client };
                }  
            );

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

    async updateClient(data:updateClientInput){
        try{
            const clientVerification = await this.clientRepository.findIdClients({id:data.id});
            //console.log('clientVerification', clientVerification);
            const personVerification = await this.personRepository.findedPersona({id:clientVerification?.personId})
            //console.log('personVerification', personVerification);
            if(!clientVerification){
                return{
                    message:'Objeto de client no encontrado',
                    status:301
                }
            }

            if(!personVerification){
                return{
                    message:'Objeto de person no encontrado',
                    status:301
                }
            }

            let personaUpdate:any = null;
            let clientUpdate:any = null;

            const result = await this.prisma.$transaction(
                async (tx) => {
                    personaUpdate = await this.personRepository.updatePersona(tx,{
                        id: personVerification?.id,
                        firstName: data.firstName ?? personVerification?.firstName,
                        lastname: data.lastName ?? personVerification?.lastName,
                        phone: data.phone ?? personVerification?.phone,
                        address: data.address ?? personVerification?.address,
                    })

                    if(!personaUpdate){
                        return {
                            message:'No se pudo actualizar la persona',
                            status: 501
                        }
                    }

                    clientUpdate = await this.clientRepository.updatedClients({
                        id: clientVerification?.id,
                        personId: personVerification?.id,
                        NIT: data.NIT ?? clientVerification?.NIT,
                        email: data.email ?? clientVerification?.email,
                        cellphone: data.phone ?? clientVerification?.cellphone,
                        isIntern: data.isIntern ?? clientVerification?.isIntern,
                        isActive: data.IsActive ?? clientVerification?.isActive,
                    },tx)

                    if(!clientUpdate){
                        return {
                            message:'No se pudo actualizar el cliente',
                            status: 501
                        }
                    }

                    return { personaUpdate, clientUpdate };
                }

            )

            return {
                messge:'Actualizacion exitos de cliente',
                status:201,
                updateClient: {
                    ...clientUpdate,
                    person: personaUpdate, // ✅ Incluir persona actualizada
                },
            }

        }catch(err){
            console.log('[LOG] siguientes problemas:' + err.message)
            return {
                message:'Se presento en UpdCl son: '+ err.message ,
                status:501,
            }
        }
    }

    async deleteClient(data:deleteClientInput){
        let clients:any = null;
        let person:any = null;
        try {
            const result = await this.prisma.$transaction(
                async (tx) => {
                    const verificationClient = await this.clientRepository.findIdClients({id:data.id});

                    if(verificationClient?.status === 0 ){
                        return {
                            message:'Este objeto se encuentra en deshabilidato',
                            status:301
                        }
                    }
                    person = await this.personRepository.deletePersona(tx,{
                                    id:verificationClient?.personId
                                });
                    clients = await this.clientRepository.deletedClients(data,tx);

                    if(!clients){
                        return {
                            message:'Surgio un problema con el objeto ',
                            status:401
                        }
                    }

                }
            )

            return {
                message:'Eliminacion exitosa del cliente',
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
    
}

@Injectable()
export class ClientsUseList{
    constructor(
        private readonly clientRepository: ClientRepository,
        
    ){}

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
        try{
            const allClients = await this.clientRepository.allClients();
            
            if(!allClients){
                return{
                    message:'objeto con problemas de conexiones.',
                    status:301
                }
            }

            if(allClients.length === 0){
                return {
                    message:'No se encontraron objetos',
                    status: 301
                }
            }

            return {
                message:'Excelente se encontraron los objetos',
                status: 201,
                allClients: allClients.map(client => ({
                    id: client.id ,
                    firtName: client.person.firstName,
                    lastName: client.person.lastName,
                    phone: client.person.phone, 
                    address: client.person.address,
                    NIT: client.NIT,
                    status: client.status
                }))
            }
        
        }catch(err){
            console.log('[LOG] Se presentaron los siguientes errores: ' + err.message)
            return {
                message:'En AllCli se presentaron fallas: ' + err.message,
                status: 501
            }
        }
    }
}