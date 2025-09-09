import { Resolver , Mutation ,  Args , Query , Context} from "@nestjs/graphql";
import { LoginResponse, LoginUserInput } from "../domain/dto/login-user.input";
import { UserUseCase , actionUserPerson} from "../domain/service/user.use-case";
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
import { ListUserOutPut } from "../domain/dto/ListAll-user.input";

@Resolver(() => User)
//@UseGuards(GqlAuthGuard ,RolesGuard)
//@SetMetadata('roles', ['EMPRESA','ABOGADO'])
export class UserResolver {
    constructor( 
        private readonly loginUser: UserUseCase ,
        private readonly actionsUser: actionUserPerson
    ){}

    @Mutation(() => LoginResponse)
    //@UseGuards(GqlAuthGuard)
    async login(@Args('data') data: LoginUserInput , @Context() ctx:any ) {
       return this.loginUser.login(data, ctx.req.client);
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
        return await this.actionsUser.createUserPerson(data);
    }

    /*@Mutation(()=> UpdateUserOutPut)
    async updateUserPerson(@Args('data') data: UpdateUserPersonInput) {
        return await this.actionsUser.updateUserPerson(data);
    }*/

    @Mutation(()=> DeleteUserOutput)
    async deleteUserPerson(@Args('data') data: DeleteUserInput) {
        return await this.actionsUser.deleteUserPerson(data)
    }

    @Query(()=>ListUserOutPut )
    async userAllLists(){
        return await this.loginUser.userAll();
    }
}