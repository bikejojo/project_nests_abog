import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth.service";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer/lawyer.repository";

@Injectable()
export class LawyerUseCase {
    constructor(
        private authService: AuthService ,
        private LawyerRepository: LawyerRepository
    ){}
}