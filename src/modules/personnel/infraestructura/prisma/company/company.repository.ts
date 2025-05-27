import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CompanyRepository {
    constructor(private prisma: PrismaService){}

    createCompany(data:any){
       return this.prisma.company.create({
            data: {
                name: data.name,
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

    updateCompany(data:any){
        return this.prisma.company.update({
            where:{id:data.id},
            data:{
                name: data.name ,
                email: data.email,
                phone: data.phone,
                address: data.address,
                updatedAt: new Date
            }
        })
    }

    findCompany(data:any){
        return this.prisma.company.findFirst({where:{id:data}})
    }

    deleteCompany(data:any){
        this.prisma.company.update({
            where:{id:data},
            data:{status:0}
        })

        return this.prisma.company.findFirst({
            where:{id:data}
        })
    }
}