import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import { AuthService } from "src/auth/auth.service";
import { ClientRepository } from "../../infraestructura/prisma/clients.repository";

@Injectable()
export class ClientsUseCase{
    constructor(private clientRepository: ClientRepository){}

    async createClient(data:any){}
}