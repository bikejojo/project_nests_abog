import { Injectable } from "@nestjs/common";
import { PermissionsRepository } from "../../infraestructura/permissions.repository";

@Injectable()
export class PermissionsUseCase {
    constructor(private permissionsRepository:PermissionsRepository){}

    async createPermissions(data:any){
        try {
            const permissions = await this.permissionsRepository.createdPermissions({
                description:data.description ,
                status: 1,
                createdAt: new Date,
                updatedAt: new Date
            })
            if(!permissions){
                return {
                    message:'Error al crear permisos para el rol',
                    status:1
                }
            }

            return {
                message: 'Creacion de permisos exitoso. !!!',
                status:2,
                dataPermissions:permissions
            }
        } catch(err){
            console.log('Se presentaron errores en CrPer y son: ' + err.message)
            return {
                message:'Se presentaron errores en CrPer y son: ' + err.message,
                status:3,
            }
        }
    }
}