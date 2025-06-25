import { Resolver , Query , Args , Mutation } from '@nestjs/graphql';
import { ModuleMenuPermissionsUseCase } from '../domain/services/moduleMenuPermissions.use-case';
import { AllModuleMenuPermissionDataOutPut } from '../domain/dto/allModuleMenuPermission.input';
import { assingUserDataInput, assingUserDataOutPut } from '../domain/dto/assingUserModuleMenuPermission.input';
import { updateUserModuleMenuPermissionsInput, updateUserModuleMenuPermissionsOutPut } from '../domain/dto/updateUserModuleMenuPermission.input';

@Resolver()
export class ModuleMenuPermissionResolver {
    constructor(
        private readonly moduleMenuPermissionsUseCase: ModuleMenuPermissionsUseCase 
    ){}

    @Query(() => AllModuleMenuPermissionDataOutPut)
    async allModuloMenuPermissions(){
        return await this.moduleMenuPermissionsUseCase.listAllModuleMenuPermissions();
    }

    @Mutation(()=> assingUserDataOutPut)
    async assingUserPermissionMod(@Args('data') data:assingUserDataInput ){
        return await this.moduleMenuPermissionsUseCase.assignmentUserPermiss(data);
    }

    @Mutation(()=> updateUserModuleMenuPermissionsOutPut )
    async updateUserPermissionsMod(@Args('data') data:updateUserModuleMenuPermissionsInput ) {
        return await this.moduleMenuPermissionsUseCase.updatedUserPermiss(data)
    }
    
}