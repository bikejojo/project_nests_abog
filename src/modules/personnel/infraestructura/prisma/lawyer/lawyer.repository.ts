import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LawyerRepository {
    constructor(private prisma: PrismaService){}

    async createLawyer(data:any){
        return await this.prisma.lawyer.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                status: data.status,
                address: data.address,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: data.userId,
            }
       });
    }
    
    findLawyer(data:any){
        return this.prisma.lawyer.findFirst({ where:{ id:data }})
    }

    async updateLawyer(data:any, userId:number){
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                email: data.email,
                name: data.name
            }
        });
        return await this.prisma.lawyer.update({
            where: { id: data.id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                updatedAt: new Date()
            }
        })
    }
    async deleteLawyer(data:any){
        
        await this.prisma.lawyer.update({
            where:{id: data},
            data: {
                status: 0
            }
        })

        return await this.prisma.lawyer.findFirst({
            where:{id:data}
        })
    }
}