import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientRepository {
    constructor(private readonly prisma:PrismaService){}
}