import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service"
import { CreateUserInput } from "../../domain/dto/create-user.input";
import { UpdateUserInput } from "../../domain/dto/update-user.input";

@Injectable()
export class UserRepository {
    
}
