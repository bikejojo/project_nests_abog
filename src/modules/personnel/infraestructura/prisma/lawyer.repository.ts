import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LawyerRepository {
    constructor(private readonly prisma:PrismaService){}
    
    async createLawyer(data:any){
        return this.prisma.lawyer.create({
            data:{
                registrationDate: data.registrationDate ,
                isActive: data.isActive ,
                isFiscal: data.isFiscal ,
                isIntern: data.isIntern ,
                status: data.status ,
                createdAt: data.createdAt ,
                updatedAt: data.updatedAt ,
                personId: data.personId ,
                userId: data.userId //
            }
        })
    }
}