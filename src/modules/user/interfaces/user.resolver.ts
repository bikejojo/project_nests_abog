import { Resolver , Mutation ,  Args , Query} from "@nestjs/graphql";
import { LoginResponse, LoginUserInput } from "../domain/dto/login-user.input";
import { UserUseCase } from "../domain/service/user.use-case";
import { User } from "../entities/user.entity";
import { UseGuards , SetMetadata} from "@nestjs/common";
import { RolesGuard } from "../../../guards/roles.guards";
import { GqlAuthGuard } from "../../../auth/authentification";
import { LogoutUserOutPut } from "../domain/dto/logout-user.input";
import { CurrentUser } from "src/common/decorator/current-user.decorator";

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

    @Query(() => String)
    sayHello(): string {
        return 'Hello from UserResolver';
    }
}