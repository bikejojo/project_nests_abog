import { Injectable } from "@nestjs/common";
import { RolesRepository } from "src/modules/roles/infraestructura/roles.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { roleUserRepository } from "../../infraestructura/roleUser.repository";

@Injectable()
export class rolUserUseCase {
    constructor(
        private usersRepository:UserRepository ,
        private rolesRepository:RolesRepository ,
        private rolUserRepository:roleUserRepository
    ){}

    async assingRolUser(data:any){
        try {

            const role = await this.rolesRepository.findIdRoles({
                id:data.roleId
            });
            
            if(!role){
                return {
                    message:'El rol no existe !!!',
                    status:1
                }
            }

            if(role?.status === 0){
               return {
                message: 'El rol esta desactivado !!!' ,
                status: 1
               } 
            }

            const user = await this.usersRepository.findIdUsers({
                id: data.userId});
                
            if(!user){
                return {
                    message:'El usuario no existe. !!' ,
                    status:1
                }
            }

            if(user?.status === 0){
                return {
                    message: 'El usuario se encuentra deshabilitado !!!' ,
                    status: 1
                }
            }

            //const safeData = Array.isArray(data) ? data: [data];
            const rolUser = await this.rolUserRepository.assingRoleUser(data);

            return {
                message:'Registro exitoso del rol con el usuario!',
                status: 2,
                //assingRole:rolUser,
                assingRole: {
                    roleId:rolUser.rolId,
                    roleName: role.description,
                    userId:rolUser.userId,
                    userName:user.name
                }
            }

        } catch(err){
            console.log('[LOG] Se presentaron fallas en AssRolUs y son: ' + err.message);
            return {
                message:'[LOG] Se presentaron fallas en AssRolUs y son: ' + err.message,
                status:3
            }
        }
    }

    async unsubcribeRolUser(data:any){
        try {
            const role = await this.rolesRepository.findIdRoles({
                id:data.roleId
            });
            
            if(!role){
                return {
                    message:'El rol no existe !!!',
                    status:1
                }
            }

            if(role?.status === 0){
               return {
                message: 'El rol esta desactivado !!!' ,
                status: 1
               } 
            }

            const user = await this.usersRepository.findIdUsers({
                id: data.userId});
                
            if(!user){
                return {
                    message:'El usuario no existe. !!' ,
                    status:1
                }
            }

            if(user?.status === 0){
                return {
                    message: 'El usuario se encuentra deshabilitado !!!' ,
                    status: 1
                }
            }

            const userRolId = await this.rolUserRepository.findIdRolUser({
                userId: user.id ,
                rolId: role.id
            })

            const unsubcribeRolUser = await this.rolUserRepository.unsubscribeRoleUser(userRolId)

            if(!unsubcribeRolUser){
                return {
                    message:'No se creo el registro',
                    status:1
                }
            }

            return {
                message:'Registro exitoso del rol al desacoplar con permisos',
                status:2,
                unsubcribeRolUser: unsubcribeRolUser
            }
        } catch(err){
            console.log('[LOG] Se presentaron errores en UnSbRolUs y son: ' + err.message);
            return{
                message: '[LOG] Se presentaron errores en UnSbRolUs y son: ' + err.message ,
                status: 3
            }
        }
    }
}