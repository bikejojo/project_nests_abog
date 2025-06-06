import { Mutation , Query , Resolver , Args } from "@nestjs/graphql";
import { PermissionsRols } from "../entities/permissionsRols.entity";
import { assingPermissionsRolData , assingPermissionsRolInput , assingPermissionsRolOutPut } from "../domain/dto/assing-permissionsRol.input";
import { PermissionsRolsUseCase } from "../domain/service/PermissionsRol.use-case";
import { unsubcriptionPermissionRolInput, unsubcriptionPermissionRolOutPut } from "../domain/dto/unsubcription-permissions.input";
import { findIdPermissionsRolOutPut, findIdPermissonsRolInput } from "../domain/dto/findId-permissionsRol.input";


@Resolver(PermissionsRols)
export class PermisssionsRolsResolver {
    constructor(private readonly permissosRolUseCase:PermissionsRolsUseCase){}

    @Mutation(() => assingPermissionsRolOutPut)
    async assignPermissionsRol(@Args('data') data:assingPermissionsRolInput ){
        return await this.permissosRolUseCase.createPermissionsRole(data);
    } 

    @Mutation(()=>unsubcriptionPermissionRolOutPut)
    async unsubcriptionPermissionsRol(@Args('data') data:unsubcriptionPermissionRolInput ){
        return await this.permissosRolUseCase.unsubcriptionPermissionsRole(data)
    }
    
    @Query(()=>findIdPermissionsRolOutPut)
    async findPermissionsRols(@Args('data') data:findIdPermissonsRolInput ){
        return await this.permissosRolUseCase.getPermissionsByRol(data)
    }
}
