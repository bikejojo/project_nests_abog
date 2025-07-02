import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class LawyerRepository {
    constructor(private readonly prisma:PrismaService){}
    
    // mutations

    async createLawyer(prisma:Prisma.TransactionClient,data:any){
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
                userId: data.userId
            }
        })
    }

    async updateLawyerUser(prisma: Prisma.TransactionClient, data:any){
        return await prisma.lawyer.update({
            where:{
                id:data.id
            },
            data:{
                userId:data.userId,
                branchOfficeId:data.branchOfficeId
            }
        })
    }

    async updateLawyer(prisma: Prisma.TransactionClient,data:any){
        return await prisma.lawyer.update({
            where:{
                id:data.id
            },
            data:{
                isFiscal:data.isFiscal ,
                isIntern:data.isIntern ,
            }
        })
    }

    async deleteLawyer(prisma: Prisma.TransactionClient,data:any){
        return await prisma.lawyer.update({
            where:{
                id:data.id
            },
            data:{
                status:data.status ,
                isActive:data.isActive
            }
        })
    }

    async inactiveLawyer(prisma: Prisma.TransactionClient,data:any){
        return await prisma.lawyer.update({
            where:{
                id: data.id
            },
            data:{
                isActive:data.isActive
            }
        })
    }
    //querys 
    async allLawyerActStat(){
        return await this.prisma.lawyer.findMany({
            where:{
                status:1,
                isActive:true,
                persona:{
                    status:1
                }
            },
            include:{
                persona:true
            }
        })
    }

    async allLawyerInactStat(){
        return await this.prisma.lawyer.findMany({
            where:{
                isActive:false,
                status:1,
                persona:{
                    status:1
                }
            },
            include:{
                persona:true
            }
        })
    }

    async allLawyerByUser(){
        return await this.prisma.lawyer.findMany({
            where:{
                status:1 ,
                persona:{
                    status:1
                }
            },
            include: {
                persona: true,
            }
        });
    }

    async findLawyerId(data:any){
        return await this.prisma.lawyer.findUnique({
            where:{
                id:data.id
            },
            include:{
                persona:true
            }
        })
    }
}