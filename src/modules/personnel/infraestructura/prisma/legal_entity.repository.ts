import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LeganEntityRepository {
    constructor(private readonly prisma:PrismaService){}
    
}