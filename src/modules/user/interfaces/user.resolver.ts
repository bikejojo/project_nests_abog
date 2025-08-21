import { Resolver , Mutation ,  Args , Query} from "@nestjs/graphql";
import { LoginResponse, LoginUserInput } from "../domain/dto/login-user.input";
import { UserUseCase } from "../domain/service/user.use-case";
import { User } from "../entities/user.entity";
import { UseGuards , SetMetadata} from "@nestjs/common";
import { RolesGuard } from "../../../guards/roles.guards";
import { GqlAuthGuard } from "../../../auth/authentification";
import { LogoutUserOutPut } from "../domain/dto/logout-user.input";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { CreateUserInput, createUserLawyerOutPut } from "../domain/dto/create-user.input";
import { UpdateUserOutPut, UpdateUserPersonInput } from "../domain/dto/update-user.input";

@Resolver(() => User)
//@UseGuards(GqlAuthGuard ,RolesGuard)
//@SetMetadata('roles', ['EMPRESA','ABOGADO'])
export class UserResolver {
    constructor( private readonly loginUser: UserUseCase ){}

    @Mutation(() => LoginResponse)
    async login(@Args('data') data: LoginUserInput) {
       return this.loginUser.login(data);
    }

    @Mutation(()=> LogoutUserOutPut)
    @UseGuards(GqlAuthGuard)
    async logout( @CurrentUser() user:any){
        return this.loginUser.logout(user);
    }

    /*@Mutation(()=> createUserLawyerOutPut)
    async createUserLawyer(@Args('data') data:CreateUserInput ){
        return this.loginUser.createPersonLawyerUser(data)
    }*/

    @Mutation(()=> createUserLawyerOutPut)
    //@UseGuards(GqlAuthGuard)
    async createUser(@Args('data') data: CreateUserInput) {
        return await this.loginUser.createUserPerson(data);
    }

    @Mutation(()=> UpdateUserOutPut)
    async updateUserPerson(@Args('data') data: UpdateUserPersonInput) {
        return await this.loginUser.updateUserPerson(data);
    }
}