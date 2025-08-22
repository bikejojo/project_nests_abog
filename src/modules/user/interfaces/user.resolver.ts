import { Resolver , Mutation ,  Args , Query} from "@nestjs/graphql";
import { LoginResponse, LoginUserInput } from "../domain/dto/login-user.input";
import { UserUseCase } from "../domain/service/user.use-case";
import { User } from "../entities/user.entity";
import { UseGuards , SetMetadata, Delete} from "@nestjs/common";
import { RolesGuard } from "../../../guards/roles.guards";
import { GqlAuthGuard } from "../../../auth/authentification";
import { LogoutUserOutPut } from "../domain/dto/logout-user.input";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { CreateUserInput, createUserLawyerOutPut } from "../domain/dto/create-user.input";
import { UpdateUserOutPut, UpdateUserPersonInput } from "../domain/dto/update-user.input";
import { DeleteUserInput, DeleteUserOutput } from "../domain/dto/delete-user.input";
import { RefreshTokenResponse } from "../domain/dto/refresh-token.input";
import { RefreshAuthGuard } from "src/guards/refresh-auth.guard";

@Resolver(() => User)
//@UseGuards(GqlAuthGuard ,RolesGuard)
//@SetMetadata('roles', ['EMPRESA','ABOGADO'])
export class UserResolver {
    constructor( private readonly loginUser: UserUseCase ){}

    @Mutation(() => LoginResponse)
    //@UseGuards(GqlAuthGuard)
    async login(@Args('data') data: LoginUserInput) {
       return this.loginUser.login(data);
    }

    @Mutation(()=> RefreshTokenResponse)
    async refresh(@CurrentUser() user:any){
        return this.loginUser.refreshUser(user);
    }
    

    @Mutation(()=> LogoutUserOutPut)
    @UseGuards(GqlAuthGuard)
    async logout( @CurrentUser() user:any){
        return this.loginUser.logout(user);
    }

    //@Mutation(() => RefreshTokenResponse)
    //@UseGuards(RefreshAuthGuard)
    //async refreshToken(@CurrentUser() user: any) {
    //    return this.loginUser.refreshToken(user.id);
    //}

    @Mutation(()=> createUserLawyerOutPut)
    //@UseGuards(GqlAuthGuard)
    async createUser(@Args('data') data: CreateUserInput) {
        return await this.loginUser.createUserPerson(data);
    }

    @Mutation(()=> UpdateUserOutPut)
    async updateUserPerson(@Args('data') data: UpdateUserPersonInput) {
        return await this.loginUser.updateUserPerson(data);
    }

    @Mutation(()=> DeleteUserOutput)
    async deleteUserPerson(@Args('data') data: DeleteUserInput) {
        return await this.loginUser.deleteUserPerson(data)
    }
}