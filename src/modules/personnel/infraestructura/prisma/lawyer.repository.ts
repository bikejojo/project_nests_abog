import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LawyerRepository {
    constructor(private readonly prisma:PrismaService){}
    
    // mutations

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
                userId: data.userId
            }
        })
    }

    async updateLawyerUser(data:any){
        return await this.prisma.lawyer.update({
            where:{
                id:data.id
            },
            data:{
                userId:data.userId,
                branchOfficeId:data.branchOfficeId
            }
        })
    }

    async updateLawyer(data:any){
        return await this.prisma.lawyer.update({
            where:{
                id:data.id
            },
            data:{
                isFiscal:data.isFiscal ,
                isIntern:data.isIntern ,
            }
        })
    }

    async deleteLawyer(data:any){
        return await this.prisma.lawyer.update({
            where:{
                id:data.id
            },
            data:{
                status:data.status ,
                isActive:data.isActive
            }
        })
    }

    async inactiveLawyer(data:any){
        return await this.prisma.lawyer.update({
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