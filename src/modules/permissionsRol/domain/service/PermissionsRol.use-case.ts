import { Injectable } from "@nestjs/common";
import { RolesRepository } from "src/modules/roles/infraestructura/roles.repository";
import { PermissionRolRepository } from "../../infraestructura/permissionRol.repository";
import { PermissionsRepository } from "src/modules/permissions/infraestructura/permissions.repository";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class PermissionsRolsUseCase {
    constructor(
        private rolesRepository:RolesRepository ,
        private permissionsRolRepository:PermissionRolRepository ,
        private permissionsRepository:PermissionsRepository
    ){}

    async createPermissionsRole(data:any){
        const existingRol = await this.rolesRepository.findIdRoles({
            id:data.rolId
        })


            if(existingRol?.status === 0){
                return {
                    message:'El rol se encuentra deshabilitado. !!',
                    status:1
                }
            }
            if(!existingRol){
                return {
                    message:'El rol se encuentra en conflicto. !!',
                    status:1
                }
            }

        const existingPermission = await this.permissionsRepository.findPermission({
            id:data.permissionsId
        })

            if( existingPermission?.status === 0 ){
                return {
                    message:'El permiso escogido esta deshabilitado.',
                    status:1
                }
            }
            if( !existingPermission ){
                return {
                    message:'El permiso tiene conflictos de creacion.',
                    status:1
                }
            }

        const rolePermissions = await this.permissionsRolRepository.assingPermissionsRol({
            rolId:data.rolId,
            permissionId: data.permissionsId,
            status:1,
            createdAt:new Date,
            updatedAt:new Date
        })

            if(!rolePermissions){
                return {
                    message:'Se presentaron problemas en la asignacion de Permisos a los Roles',
                    status:1
                }
            }
        return {
            message:'Asignación exitosa entre el rol y el permiso',
            status:2,
            permissionsData:rolePermissions   
        }
    }

    async unsubcriptionPermissionsRole(data:any){
         const existingRol = await this.rolesRepository.findIdRoles({
            id:data.rolId
        })


            if(existingRol?.status === 0){
                return {
                    message:'El rol se encuentra deshabilitado. !!',
                    status:1
                }
            }
            if(!existingRol){
                return {
                    message:'El rol se encuentra en conflicto. !!',
                    status:1
                }
            }

        const existingPermission = await this.permissionsRepository.findPermission({
            id:data.permissionsId
        })

            if( existingPermission?.status === 0 ){
                return {
                    message:'El permiso escogido esta deshabilitado.',
                    status:1
                }
            }
            
            if( !existingPermission ){
                return {
                    message:'El permiso tiene conflictos de creacion.',
                    status:1
                }
            }

        const rolesPermissions = await this.permissionsRolRepository.findIdPermissionsRol({
            rolId:data.rolId,
            permissionId:data.permissionId
        })

            if(rolesPermissions?.status === 0){
                return {
                    message:'El estado de esta relacion se encuentra deshabilitado.',
                    status:1
                }
            }

        const rolePermissions = await this.permissionsRolRepository.unsubcriptionPermissionRol({
            id:rolesPermissions?.id
        })

            if(!rolePermissions){
                return {
                    message:'Se presentaron problemas en la asignacion de Permisos a los Roles',
                    status:1
                }
            }

        return {
            message:'Asignación exitosa entre el rol y el permiso',
            status:2,
            permissionsData:rolePermissions    
        }
    }

    async getPermissionsByRol(data: any) {
        try {
            const relations = await this.permissionsRolRepository.findPermissionsByRolId(data)

            if (!relations || relations.length === 0) {
                return {
                    message: 'EL rol no cuenta con permisos.',
                    status: 1,
                    permissionsRolOutPut: null,
                };
            }
            //console.log('1234' , relations);
            const { rol } = relations[0];
            const permissions = relations.map((rel) => ({
                permissionId: rel.permission.id,
                description: rel.permission.description     ?? 'sin descripcion',
            }));

            return {
                message:'Permisos del rol retorno exitoso !!',
                status: 2 ,
                permissionsRolOutPut: {
                    rolId: rol.id,
                    rolName: rol.description,
                    permissions: permissions.map((p) => ({
                            permissionId: p.permissionId,
                            description: p.description ?? 'sin descripcion'
                        })
                    )
                },
            }

            //return relations?.map((re1) => re1.permission);
        } catch(err){
            console.log('Se presentaron fallas en GetPerByRol y son: ' + err.message);
            return {
                message:'Se presentaron fallas en GetPerByRol y son: ' + err.message,
                status: 3,

            }
        }
    }
}