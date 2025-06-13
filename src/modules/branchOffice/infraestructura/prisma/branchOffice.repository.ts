import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BranchOfficeRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async listCity(){
        return await this.prisma.branch_Office.findMany({
            where:{
                status:1
            }
        });
    }
}