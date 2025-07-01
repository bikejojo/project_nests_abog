import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { status } from "src/common/enum/typeStatus";
import { stat } from "fs";

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
        return await this.prisma.judge.findUnique({
            where:{
                id:data.id
            },
            select:{
                id:true,
                registratioDate:true,
                description:true,
                isActive:true,
                isIntern:true,
                status:true,
                personId:true
            }
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

    async deleteJudge(data:any){
        return await this.prisma.judge.update({
            where:{ id:data.id } ,
            data: {
                status:data.status,
                isActive:data.isActive
            }
        })
    }

    async inactiveJudge(data:any){
        return await this.prisma.judge.update({
            where:{ id:data.id },
            data:{
                isActive:data.isActive
            }
        })
    }

    async allJudgeActiveStatus(){
        return await this.prisma.judge.findMany({
            where:{
                status:1,
                isActive:true,
                persona:{
                    status:1
                }
            },
            include:{
                persona:true ,
            },
            orderBy:{
                id:'asc'
            }
        })
    }

    async allJudgeInactiveStatus() {
        return await this.prisma.judge.findMany({
            where:{
                status:1,
                isActive:false ,
                persona:{
                    status:1
                }
            },
            include:{
                persona:true
            } ,
            orderBy:{
                id:'asc'
            }
        })
    }

    async allJudge(){
        return await this.prisma.judge.findMany({
            where:{
                status:1,
                persona:{
                    status:1
                }
            },
            include:{
                persona:true
            } ,
            orderBy:{
                id:'asc'
            }
        })
    }
}