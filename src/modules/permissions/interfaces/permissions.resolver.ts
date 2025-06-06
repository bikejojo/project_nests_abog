import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { Permissions } from "../entities/permissions.entities";
import { createPermissionsInput , createPermisionsOutPut } from "../domain/dto/create-permissions.input";
import { PermissionsUseCase } from "../domain/service/permissions.use-case";

@Resolver(Permissions)
export class PermissionsResolver {
    constructor(private readonly permissionsUseCase:PermissionsUseCase){}

    @Mutation(()=>createPermisionsOutPut)
    async createPermission(@Args('data') data:createPermissionsInput ){
        return this.permissionsUseCase.createPermissions(data);
    }
}
