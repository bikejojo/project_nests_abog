import { Injectable } from "@nestjs/common";
import { ModuleMenuPermissionsRepository } from "../../infraestructura/prisma/moduleMenuPermissions.repository";
import { response } from "src/common/enum/typeResp";

@Injectable()
export class ModuleMenuPermissionsUseCase {
    constructor(
        private readonly moduleMenuPermissionsRepository: ModuleMenuPermissionsRepository
    ){}

    async listAllModuleMenuPermissions() {
        try {
            const allContent = await this.moduleMenuPermissionsRepository.listAllModuleMenuPermissions();
            if (!allContent) {
                return {
                    message: 'Error al traer los datos de permisos de modulos y menus.',
                    status: response.FALL,
                    allModuleMenuPermission: null
                }
            }

            if (allContent.length === 0) {
                return {
                    message: 'No existen datos de permisos de modulos y menus.',
                    status: response.FALL,
                    allModuleMenuPermission: null
                }
            }
            const allModuleMenuPermission = allContent.map(module => {
                return {
                    moduleId: module.id,
                    moduleName: module.name,
                    contentModPermi: module.moduleMenu.map(menu => {
                        return {
                            menuId: menu.menu.id,
                            menuName: menu.menu.name,
                            contentPermissions: menu.menu.menuPermissions.map(permission => {
                                return {
                                    permissionsId: permission.permissions.id,
                                    permissionsName: permission.permissions.name
                                }
                            })
                        }
                    })
                }
            });

            return {
                message: 'Retorno valores exitoso. !!',
                status: response.NICE,
                allModuleMenuPermission: allModuleMenuPermission
            }
            
        } catch (err) {
            console.log('Se presentaron errrores en AllModMenPerm y son: ' + err.message);
            return {
                message: 'Se presentaron errrores en AllModMenPerm y son: ' + err.message,
                status: response.WARN,
                allModuleMenuPermission: null
            }
        }
    }

    async assignmentUserPermiss(data:any){
        try {
            //comprobar si el user esta asociado a algun modulo , menu , permisso
            const moduleUser = await this.moduleMenuPermissionsRepository.verificationModuleUser({
                id:data.id
            })

            if(!moduleUser){
                return {
                    message:'usuario no asociado a ningun modulo',
                    status:response.FALL
                }
            }

            const menuUse = await this.moduleMenuPermissionsRepository.verificationMenuUser({
                id:data.id
            })

            if(!menuUse){
                return {
                    message:'usuario no asociado a ningun menu',
                    status:response.FALL
                }
            }

            const permissionsUse = await this.moduleMenuPermissionsRepository.verificationPermissionsUser({
                id:data.id
            })

            if(permissionsUse){
                return {
                    message:'usuario no asociado a ningun permiso',
                    status: response.FALL
                }
            }

            const existingModuloUser = this.moduleMenuPermissionsRepository.verificationIfUserHasModule({
                userId: data.userId,
                moduleId: data.moduleId
            })

            const existingModuleIds = (await existingModuloUser).map(mod => mod.moduleId);

            const newModuleIds = data.moduleIds.filter((moduleId:number) => !existingModuleIds.includes(moduleId));

            const moduleUserAssing = newModuleIds.map((moduleId:number) => ({
                userId:data.userId ,
                moduleId: data.moduleId
            }));

            if(moduleUserAssing.length > 0 ){
                await this.moduleMenuPermissionsRepository.createModuleUser(moduleUserAssing);
            }

            const existingMenuUser = this.moduleMenuPermissionsRepository.verificationIfUserHasMenu({
                userId: data.userId ,
                menuId: data.menuId
            })

            const existingMenuIds = (await existingMenuUser).map(mod=>mod.menuId)

            const newMenuIds = data.menuIds.filter((menuId:number) => !existingMenuIds.includes(menuId))

            const menuUserAssing = newMenuIds.map((menuId:number) => ({
                userId: data.userId ,
                menuId: data.menuId
            }));

            if(menuUserAssing.length > 0 ){
                await this.moduleMenuPermissionsRepository.createMenuUser(menuUserAssing)
            }

        }catch(err){
            console.log('Fallas en AssignUsPer y son: ' + err.message );
            return {
                message:'Fallas en AssignUsPer y son: ' + err.message ,
                status: response.WARN
            }
        }
    }
}