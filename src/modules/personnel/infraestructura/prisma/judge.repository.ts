import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JudgeRepository {
    constructor(private readonly prisma:PrismaService){}
    
    async createJudge(data:any){
        return await this.prisma.judge.create({
            data:{
                registratioDate: data.registrationDate ,
                description: data.description ,
                isActive:data.isActive ,
                isIntern:data.isIntern ,
                status: data.status ,
                personId: data.personId
            }
        })
    }

    async findedJudge(data:any){
        return await this.prisma.judge.findFirst({
            where:{id:data.id}
        });
    }

    async updatedJudge(data:any){
        return await this.prisma.judge.update({
            where:{ id: data.id },
            data: {
                registratioDate:data.registratioDate ,
                description:data.description ,
                isActive:data.isActive ,
                isIntern:data.isIntern ,
                status: data.status
            }
        })
    }
}