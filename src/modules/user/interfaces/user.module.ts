import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "../infraestructura/prisma/user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { UserUseCase } from "../domain/service/user.use-case";

@Module({
  providers: [
    UserResolver,
    UserRepository,
    PrismaService,
    UserUseCase
  ],
  exports: [UserUseCase]
})

export class UserModule {}