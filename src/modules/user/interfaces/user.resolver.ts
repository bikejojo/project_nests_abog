import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { UserRepository } from "../infraestructura/prisma/user.repository";
import { CreateUserInput  } from "../domain/dto/create-user.input";
import { UpdateUserInput } from "../domain/dto/update-user.input";
import { LoginUserInput } from "../domain/dto/login-user.input";
import { UserUseCase } from "../domain/service/user.use-case";
import { User } from "../entities/user.entity";

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly loginUser: UserUseCase,
    ){}

    @Mutation(() => String)
    async login(@Args('data') data: LoginUserInput){
        const result = await this.loginUser.login(data);
        return result.access_token;
    }
}