import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { createRolesInput , createRolesOutPut , rolesData } from "../domain/dto/create-role.input";
import { deleteRoleInput , deleteRoleOutPut } from "../domain/dto/delete-role.input";
import { allRolOutPut } from "../domain/dto/all-role.input";
import { roles } from "../entities/roles.entities";
import { GqlAuthGuard  } from "src/auth/authentification";
import { RolesUseCase } from "../domain/service/roles.use-case";

@Resolver(() => roles)
export class RolesResolver {
    constructor( private readonly rolesResolver:RolesUseCase){}

    @Mutation(() => createRolesOutPut)
    async createRol(@Args('data') data:createRolesInput){
        return this.rolesResolver.createdRoles(data);
    }

    @Mutation(() => deleteRoleOutPut)
    async deleteRol(@Args('data') data:deleteRoleInput){
        return this.rolesResolver.deletedRoles(data);
    }
    @Query(()=>allRolOutPut)
    async allRoles(){
        return this.rolesResolver.alledRoles();
    }
    
}
