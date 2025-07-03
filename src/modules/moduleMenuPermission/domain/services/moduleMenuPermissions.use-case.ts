import { Injectable } from "@nestjs/common";
import { ModuleMenuPermissionsRepository } from "../../infraestructura/prisma/moduleMenuPermissions.repository";
import { response } from "src/common/enum/typeResp";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { status, tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";

@Injectable()
export class ModuleMenuPermissionsUseCase {
    constructor(
        private readonly moduleMenuPermissionsRepository: ModuleMenuPermissionsRepository ,
        private readonly userRepository: UserRepository
    ){}

    private ResponseContext = new ResponseContext();

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
                            menuId: menu.menu?.id,
                            menuName: menu.menu?.name,
                            contentPermissions: menu.menu?.menuPermissions.map(permission => {
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
            const userId = parseInt(data.id)
            const user = await this.userRepository.findIdUsers({
                id: userId
            });

            const existingModuloUser = await this.moduleMenuPermissionsRepository.verificationIfUserHasModule({
                userId: user?.id,
                moduleId: data.moduleId
            })

            const existingModuleIds = existingModuloUser.map(mod => mod.moduleId);

            const newModuleIds = data.moduleIds.filter((moduleId:number) => !existingModuleIds.includes(moduleId));

            const moduleUserAssing = newModuleIds.map((moduleId:number) => ({
                userId:user?.id ,
                moduleId: moduleId ,
                status: tatus.ACTIVE
            }));

            if(moduleUserAssing.length > 0 ){
                await this.moduleMenuPermissionsRepository.createModuleUser(moduleUserAssing);
            }

            const existingMenuUser = await this.moduleMenuPermissionsRepository.verificationIfUserHasMenu({
                userId: user?.id ,
                menuId: data.menuId
            })

            const existingMenuIds = existingMenuUser.map(mod=>mod.menuId)

            const newMenuIds = data.menuIds.filter((menuId:number) => !existingMenuIds.includes(menuId))

            const menuUserAssing = newMenuIds.map((menuId:number) => ({
                userId: user?.id ,
                menuId: menuId ,
                status: tatus.ACTIVE
            }));

            if(menuUserAssing.length > 0 ){
                await this.moduleMenuPermissionsRepository.createMenuUser(menuUserAssing)
            }


            const existingPermissionsUser = await this.moduleMenuPermissionsRepository.verificationIfUserHasPermissions({
                userId: user?.id ,
                permissionsId: data.permissionsId 
            });

            const existingPermissionsIds = existingPermissionsUser.map(mod=>mod.permissionsId);

            const newPermissionsIds = data.permissionsIds.filter((permissionsId:number) => !existingPermissionsIds.includes(permissionsId))

            const permissionsUserAssing = newPermissionsIds.map((permissionsId:number)=> ({
                userId:user?.id ,
                permissionsId: permissionsId ,
                status: tatus.ACTIVE
            }))

            if(permissionsUserAssing.length > 0 ){
                await this.moduleMenuPermissionsRepository.createPermissionsUser(permissionsUserAssing);
            }

            return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Asignacion',message:'Permisos',status:response.NICE})

        }catch(err){
            console.log('Fallas en AssignUsPer y son: ' + err.message );
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({name:'AssignUsPer',message:err.message , status:response.WARN})
        }
    }

    async updatedUserPermiss(data:any){
        try { 

            const user = await this.userRepository.findIdUsers({
                id:data.id
            })

            if(!user){
                return {
                    message:'No se encontro el modelo de user.',
                    status:response.FALL
                }
            }

            await this.moduleMenuPermissionsRepository.delIdUserModule({ userId: user.id })

            await this.moduleMenuPermissionsRepository.delIdUserMenu({ userId:user.id })

            await this.moduleMenuPermissionsRepository.delIdUserPermissions({ userId:user.id })

            await this.moduleMenuPermissionsRepository.createModuleUser({
                userId: user.id ,
                moduleId: data.moduleId 
            })

            await this.moduleMenuPermissionsRepository.createMenuUser({
                userId: user.id ,
                menuId: data.menuId
            })

            await this.moduleMenuPermissionsRepository.createPermissionsUser({
                userId: user.id ,
                permissionsId: data.permissionsId
            })

            return {
                message: 'Actualizacion correcta de permisos al usuario.' ,
                status: response.NICE
            }

        }catch(err){
            console.log('Fallas en UpdUsePerm y son: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({name:'UpdUsePerm',message:err.message , status:response.WARN})
        }
    }
}