import { Injectable } from "@nestjs/common";
import { RolesRepository } from "src/modules/roles/infraestructura/roles.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";

@Injectable()
export class rolUserUseCase {
    constructor(
        private usersRepository:UserRepository ,
        private rolesRepository:RolesRepository
    ){}
    async assingRolUser(data:any){
        try {
            const role = this.rolesRepository.findIdRoles({
                id:data.roleId
            });
            const user = this.usersRepository.findIdUsers({
                id: data.userId});
        } catch(err){
            console.log('[LOG] Se presentaron fallas en AssRolUs y son: ' + err.message);
            return {
                message:'[LOG] Se presentaron fallas en AssRolUs y son: ' + err.message
            }
        }
    }

    async unsubcribeRolUser(data:any){

    }
}