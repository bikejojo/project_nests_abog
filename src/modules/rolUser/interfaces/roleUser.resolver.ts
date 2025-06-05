import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { roleUserRepository } from "../infraestructura/roleUser.repository";
import { assingRolUserInput , assingRolUserOutPut  } from "../domain/dto/assing-role-user.input";
import { RolUser } from "../entities/rolUser.entities";
import { rolUserUseCase } from "../domain/service/rolUser.use-case";
import { unsubcribeRoleUserInput , unsubcribeRoleUserOutPut } from "../domain/dto/unsubscribe-role-user.input";

@Resolver(()=>RolUser)
export class RoleUserResolver{
    constructor(private readonly roleUserResolver:rolUserUseCase){}

    @Mutation(()=>assingRolUserOutPut)
    async assingRolUse(@Args('data') data:assingRolUserInput){
        return await this.roleUserResolver.assingRolUser(data)
    }
    @Mutation(()=>unsubcribeRoleUserOutPut)
    async unsubcribreRolUser(@Args('data') data:unsubcribeRoleUserInput){
        
    }    
}
