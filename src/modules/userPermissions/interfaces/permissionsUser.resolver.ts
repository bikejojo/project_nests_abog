import { Mutation , Query , Resolver , Args } from "@nestjs/graphql";
import { userPermissions } from "../entities/userPermissions.entities";
import { assingPermissionsUserInput , assingPermissionsUserOutPut , permissionsUserData } from "../domain/dto/assing-permissonUser.user-case";
import { PermissionsUserUseCase } from "../domain/service/permissionUser.use-case";

@Resolver(userPermissions)
export class permissionsUserResolver{
    constructor(private readonly permissiosUserUseCase:PermissionsUserUseCase){}
    
    @Mutation(()=>assingPermissionsUserOutPut)
    async assingPermissionsUser(@Args('data') data:assingPermissionsUserInput ){
        return await this.permissiosUserUseCase.assingPermissionsUser(data)
    }
 //   @Mutation()
    
}
