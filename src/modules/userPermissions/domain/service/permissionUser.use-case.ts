import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { PermissionsRepository } from "src/modules/permissions/infraestructura/permissions.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { PermissionsUserRepository } from "../../infraestructura/prisma/permissionsUser.repository";
import { Stats } from "fs";

@Injectable()
export class PermissionsUserUseCase {
    constructor(
        private readonly permissionsRepository:PermissionsRepository,
        private readonly userRepository:UserRepository ,
        private readonly permissionsUserRespository: PermissionsUserRepository
    ){}

    async assingPermissionsUser(data:any){
        try {
            const user = await this.userRepository.findIdUsers({
                id: data.userId
            })

            //console.log(user);
            if(user == null){
                return{
                    message:'Busqueda de regisrto inadecuado',
                    status:1
                }
            }
           // Validar permisos existentes y activos
            const activePermissions = await this.permissionsRepository.arrayFindPermissions(data.permissionsId);

            if (activePermissions.length !== data.permissionsId.length) {
                const notFound = data.permissionsId.filter(id => !activePermissions.includes(id));
                return {
                    message: `Los siguientes permisos no existen o están inactivos: ${notFound.join(', ')}`,
                    status: 2,
                };
            }

            // Validar permisos asignables por el rol
            const permissonsRolesUser = await this.permissionsUserRespository.validationRolesPermissions({ userId: user.id });
            const rolPermissions = permissonsRolesUser?.rols?.rol?.permissions.map(p => p.permissionId) || [];

            const invalidPermissions = data.permissionsId.filter(id => !rolPermissions.includes(id));
            if (invalidPermissions.length > 0) {
                return {
                    message: `Los siguientes permisos no están asignados al rol del usuario: ${invalidPermissions.join(', ')}`,
                    status: 3,
                };
            }

            const assingUserPermissions = await this.permissionsUserRespository.assingPermissionsUser({
                userId:data.userId,
                permissionId:data.permissionsId
            });
            //console.log(assingUserPermissions)
            
            if(!assingUserPermissions){
                return {
                    message:'No funciono la insercion',
                    status:1
                }
            }

            return {
                message:'asignacion correcta con los permisos y usuarios.',
                status:2,
                permissionUserData:assingUserPermissions
            }
        }catch(err){
            console.log('[LOG] Se presentaron problemas en AssPer y son: ' + err.message);
            return {
                message: '[LOG] Se presentaron problemas en AssPer y son: ' + err.message ,
                status: 3
            }
        }
    }

    async unsubcriptionPermissionsUser(data:any){
        try {

        }catch(err){
            console.log('[LOG] Se presentaron problemas en UnsbPer y son: ' + err.message);
            return {
                message: '[LOG] Se presentaron problemas en UnsbPer y son: ' + err.message ,
                status: 3
            }
        }
    }

    async getPermissionsUser(data:any){
        try {

        }catch(err){
            console.log('[LOG] Se presentaron problemas en GetPer y son: ' + err.message);
            return {
                message: '[LOG] Se presentaron problemas en GetPer y son: ' + err.message ,
                status: 3
            }
        }
    }
}