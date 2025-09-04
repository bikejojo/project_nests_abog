import { Resolver , Query , Args , Mutation } from '@nestjs/graphql';
import { ModuleMenuPermissionsUseCase, ModuleMenuPermissionList , RolesMutations} from '../domain/services/moduleMenuPermissions.use-case';
import { AllModuleMenuPermissionDataOutPut } from '../domain/dto/allModuleMenuPermission.input';
import { assingUserDataInput, assingUserDataOutPut } from '../domain/dto/assingUserModuleMenuPermission.input';
import { updateUserModuleMenuPermissionsInput, updateUserModuleMenuPermissionsOutPut } from '../domain/dto/updateUserModuleMenuPermission.input';
import { allRols } from '../domain/dto/allRoles.input';
import { createRolInput, createRolOutPut } from '../domain/dto/createRoles.input';
import { updateRolesInput, updateRolesOutPut } from '../domain/dto/updateRoles.input';
import { deleteRolInput, deleteRolOutPut } from '../domain/dto/deleteRoles.input';

@Resolver()
export class ModuleMenuPermissionResolver {
    constructor(
        private readonly moduleMenuPermissionsUseCase: ModuleMenuPermissionsUseCase, 
        private readonly moduleMenuPermissionsList: ModuleMenuPermissionList , 
        private readonly roleMutationsUseCase: RolesMutations
    ){}

    @Query(() => AllModuleMenuPermissionDataOutPut)
    async allModuloMenuPermissions(){
        return await this.moduleMenuPermissionsList.listAllModuleMenuPermissions()
    }
    // ROLES ( CARGO )
    @Query(() => allRols)
    async allRoles(){
        return await this.moduleMenuPermissionsList.listAllRols();
    }

    /*@Mutation(()=> assingUserDataOutPut)
    async assingUserPermissionMod(@Args('data') data:assingUserDataInput ){
        return await this.moduleMenuPermissionsUseCase.assignmentUserPermiss(data);
    }*/

    @Mutation(()=> updateUserModuleMenuPermissionsOutPut )
    async updateUserPermissionsMod(@Args('data') data:updateUserModuleMenuPermissionsInput ) {
        return await this.moduleMenuPermissionsUseCase.updatedUserPermiss(data)
    }
    
    @Mutation(()=> createRolOutPut )
    async createRole(@Args('data') data:createRolInput ){
        return await this.roleMutationsUseCase.createRols(data)
    }
    @Mutation(()=> updateRolesOutPut )
    async updateRole(@Args('data') data:updateRolesInput ){
        return await this.roleMutationsUseCase.updateRols(data)
    }@Mutation(()=> deleteRolOutPut )
    async deleteRole(@Args('data') data:deleteRolInput ){
        return await this.roleMutationsUseCase.deleteRols(data)
    }
}