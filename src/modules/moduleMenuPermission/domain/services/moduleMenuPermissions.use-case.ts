import { Injectable, Res } from "@nestjs/common";
import { ModuleMenuPermissionsRepository } from "../../infraestructura/prisma/moduleMenuPermissions.repository";
import { response } from "src/common/enum/typeResp";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { status, tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { WarningResponseStrategy } from "src/common/responses/warning-response.strategy";
import { ErrorResponseStrategy } from "src/common/responses/error-response.strategy";
import { createRolInput } from "../dto/createRoles.input";
import { updateRolesInput } from "../dto/updateRoles.input";
import { deleteRolInput } from "../dto/deleteRoles.input";

@Injectable()
export class ModuleMenuPermissionsUseCase {
    constructor(
        private readonly moduleMenuPermissionsRepository: ModuleMenuPermissionsRepository ,
        private readonly userRepository: UserRepository
    ){}

    private ResponseContext = new ResponseContext();


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

@Injectable()
export class ModuleMenuPermissionList {
    private ResponseContext= new ResponseContext();
    
    constructor(
        private readonly moduleMenuPermissionsRepository: ModuleMenuPermissionsRepository ,
        private readonly userRepository: UserRepository
    ){}

    async listAllRols(){
        try {
            const allRols = await this.moduleMenuPermissionsRepository.listRols();

            if(!allRols){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({status:response.FALL,type:'Listado de roles',message:'null'})
            }

            if(allRols.length == 0){
                return this.ResponseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({type:'Listado de roles' , message:'No hay contenido' , status:response.FALL})
            }

            return this.ResponseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Existoso', message:'Listado',status:response.NICE , content: allRols.map((role) => ( {id: role.id , description: role.name })) })
        } catch(err){
            console.log('El error es el siguiente: ' + err.message);
            return this.ResponseContext.setStrategy(new WarningResponseStrategy()).executeStrategy({name:'Roles',message:err.message ,status:response.WARN})
        }
    }

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
}

@Injectable()
export class RolesMutations {
    private responseContext =  new ResponseContext();
    constructor(
        private readonly userRepository:UserRepository ,
        private readonly moduleMenuPermissionsRepository: ModuleMenuPermissionsRepository ,
    ){}

    async createRols(data:createRolInput){
        try{
           
            if(data.name == null ){
                return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({type:'Atributo mal generado' , message:'atributo viene vacio'})
            }

            await this.moduleMenuPermissionsRepository.roleCreate({
                name : data.name
            })

            return this.responseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Exitoso' , message:'creacion de rol/cargo'});
        }catch(err){
            console.log('Se presentaron errrores en CreatRol y son: ' + err.message);
        }
    }

    async updateRols(data:updateRolesInput){
        try{
            const rolid = data.id;
            const role = await this.moduleMenuPermissionsRepository.roleFind({id:rolid});
            
            if(role == null ){
                return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({type:'ID', message:'No se encontro el objeto'})
            }

            if(role?.status === 0){
                return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({type:'Estado 0', message:'El objeto a actualizar fue eliminado'})
            }

            await this.moduleMenuPermissionsRepository.roleUpdate({
                id:role?.id ,
                name: data.name ?? role?.name 
            })

            return this.responseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Exito',message:'Actualizacion de Objeto'});

        }catch(err){
            console.log('Se presentaron errores en UpdatRols y son:' + err.message)
        }
    }

    async deleteRols(data:deleteRolInput){
        try{
            const rolid = data.id;
            const role = await this.moduleMenuPermissionsRepository.roleFind({id:rolid});
            console.log(role)
            if(role?.id == null ){
                return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({type:'ID', message:'No se encontro el objeto'})
            }

            await this.moduleMenuPermissionsRepository.roleDelete({
                id:role?.id 
            })

            return this.responseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({type:'Exito',message:'Eliminacion de Objeto'});

        }catch(err){
            console.log('Se presentaron errores en DelRols y son: ' + err.message);
        }
    }
}