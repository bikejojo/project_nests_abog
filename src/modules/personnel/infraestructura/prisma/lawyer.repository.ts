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
                userId:data.userId
            }
        })
    }
    //querys 

    async allLawyerByUser(){
        let lawyers =  await this.prisma.lawyer.findMany({
            where:{
                status:1,
                userId:null
            },
            include: {
                persona: true,
            }
        });

        return lawyers.map( law => ({
            id: law.id ,
            fullName: `${law.persona.firstName} ${law.persona.lastName}` ,
            status: law.status
        }))
    }

    async findLawyerId(data:any){
        return await this.prisma.lawyer.findFirst({
            where:{
                id:data.id
            },
            include:{
                persona:true
            }
        })
    }
}