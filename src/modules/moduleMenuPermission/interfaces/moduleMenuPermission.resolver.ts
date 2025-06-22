import { Resolver , Query , Args  } from '@nestjs/graphql';
import { ModuleMenuPermissionsUseCase } from '../domain/services/moduleMenuPermissions.use-case';
import { AllModuleMenuPermissionDataOutPut } from '../domain/dto/allModuleMenuPermission.input';

@Resolver()
export class ModuleMenuPermissionResolver {
    constructor(
        private readonly moduleMenuPermissionsUseCase: ModuleMenuPermissionsUseCase 
    ){}

    @Query(() => AllModuleMenuPermissionDataOutPut)
    async allModuloMenuPermissions(){
        return await this.moduleMenuPermissionsUseCase.listAllModuleMenuPermissions();
    }
}