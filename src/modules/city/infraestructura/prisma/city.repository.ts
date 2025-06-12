import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CityRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async listCity(){
        return await this.prisma.city.findMany();
    }
}