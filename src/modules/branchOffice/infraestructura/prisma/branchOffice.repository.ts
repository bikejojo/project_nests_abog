import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
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
            },
            orderBy:{
                id:'asc'
            }
        });
    }

    async createBranchOffices(data:any){
        return await this.prisma.branch_Office.create({
            data:{
                name: data.name,
                address: data.address ,
                cityId: data.cityId ,
                phone: data.phone ,
                email: data.email ,
                status: 1
            }
        })
    }

    async findIdBranchOffices(data:any){
        return await this.prisma.branch_Office.findUnique({
            where:{
                id:data.id
            },
        })
    }

    async updateBranchOffices(data:any){
        return await this.prisma.branch_Office.update({
            where:{
                id:data.id
            } ,
            data:{
                name:data.name,
                address:data.address,
                cityId:data.cityId,
                phone:data.phone,
                email:data.email
            }
        })
    }

    async deleteBranchOffice(data:any,tx?:Prisma.TransactionClient){
        const prisma = tx || this.prisma;
        return await prisma.branch_Office.update({
            where:{
                id:data.id
            },
            data:{
                status:0
            }
        });
    }
}