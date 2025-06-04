import { Injectable } from "@nestjs/common";
import { RolesRepository } from "../../infraestructura/roles.repository";

@Injectable()
export class RolesUseCase{
    constructor(private rolesRepository:RolesRepository)
    {}
    async createdRoles(data:any){
        try{
            const roles = this.rolesRepository.createRoles({
                description:data.description,
                status:1,
                createdAt: new Date ,
                updatedAt: new Date
            })

            if(!roles){
                return {
                    message: 'Falas en la creacion del rol',
                    status: 1,
                    rolesDatas:null
                }
            }

            return{
                message: 'Creacion exitosa del rol',
                status: 2,
                rolesDatas:roles
            }
        }catch(err){
            console.log('[LOG] Se presentaron en CrRol las siguientes fallas:' + err.message)
            return {
                message:'se presentaron fallas:' + err.message,
                status:3
            }
        }
    }

    async deletedRoles(data:any){
        try{
            const rolPrev = await this.rolesRepository.findIdRoles(data);
            if(rolPrev?.status === 0 ){
                console.log('estado 0 del objeto.')
                return{
                    message:'Este objeto se encuentra deshabilitado',
                    status:2
                }
            }

            const rol = await this.rolesRepository.deleteRoles(data);

            if(!rol){
                console.log('objeto no cumplio la accion.');
                return {
                    message:'El objeto no se dio de baja!!',
                    status:1
                }
            }

            return {
                message:'El objeto se dio de baja exitosamente.',
                status:2,
                roleDatas:rol
            }

        }catch(err){
            console.log('[LOG] Se presentaron fallas en DelRol y son: '+err.message);
            return {
                message:'Fallas en DelRol son: ' + err.message,
                status:3
            }
        }
    }


    async alledRoles(){
        return await this.rolesRepository.allRoles();
    }
}