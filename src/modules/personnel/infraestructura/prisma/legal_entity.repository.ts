import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class LegalEntityRepository {
    constructor(private readonly prisma:PrismaService){}
    
    async createLegalEntity(data:any , prisma:Prisma.TransactionClient){
        return await prisma.legal_Entity.create({
            data:{
                NIT: data.NIT,
                companyName: data.companyName,
                address: data.address,
                registrationDate: data.registrationDate,
                legalRepresentive: data.legalRepresentative,
                typeCompany: data.typeCompany,
                personId: data.personId,
            }
        })
    }

    async findIdLegalEntity(data:any){
        return await this.prisma.legal_Entity.findUnique({
            where: {
                id: data.id
            }
        })
    };

    async updateLegalEntity(prisma: Prisma.TransactionClient,data:any){
        return await prisma.legal_Entity.update({
            where: {
                id: data.id
            },
            data:{
                NIT: data.NIT,
                companyName: data.companyName,
                address: data.address,
                registrationDate: data.registrationDate,
                legalRepresentive: data.legalRepresentive,
                typeCompany: data.typeCompany,
            }
        })
    };

    async deleteLegalEntity(prisma: Prisma.TransactionClient,data:any){
        return await prisma.legal_Entity.update({
            where: {
                id: data.id
            },
            data: {
                status: data.status
            }
        })
    };
}