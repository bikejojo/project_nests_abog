import { Injectable } from "@nestjs/common";
import { ModuleMenuPermissionsRepository } from "../../infraestructura/prisma/moduleMenuPermissions.repository";

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
                    status: 1,
                    allModuleMenuPermission: null
                }
            }

            if (allContent.length === 0) {
                return {
                    message: 'No existen datos de permisos de modulos y menus.',
                    status: 1,
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
                status: 2,
                allModuleMenuPermission: allModuleMenuPermission
            }
            
        } catch (err) {
            console.log('Se presentaron errrores en AllModMenPerm y son: ' + err.message);
            return {
                message: 'Se presentaron errrores en AllModMenPerm y son: ' + err.message,
                status: 3,
                allModuleMenuPermission: null
            }
        }
    }
}