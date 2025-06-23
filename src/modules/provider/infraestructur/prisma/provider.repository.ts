import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProviderRepository {
    constructor(private prisma:PrismaService){}
    //mutation
    async createProvider(data:any){
        return this.prisma.provider.create({
            data:{
                firstName: data.firstName,
                lastName:data.lastName,
                NIT: data.NIT ,
                phone: data.phone,
                email: data.email,
                address: data.address,
                typeProvider: data.typeProvider,
                status: data.status,
                isActive: data.isActive,
                createAt: new Date(),
                updateAt: new Date()
            }
        })
    }
    async updateProvider(data:any){
        return await this.prisma.provider.update({where:{id:data.id},
            data:{
              firstName: data.firstName,
                lastName:data.lastName,
                NIT: data.NIT ,
                phone: data.phone,
                email: data.email,
                address: data.address,
                typeProvider: data.typeProvider,
                status: data.status,
                isActive: data.isActive,
                updateAt: new Date()
            }
        });
    }
    async deleteProvider(data:any){
        return await this.prisma.provider.update({where:{id:data},data:{status:0 , isActive:false}})
    }
    //query
    async findIdProvider(data:any){
        return await this.prisma.provider.findUnique({where:{id:data}})
    }
    async allStatusProvider(data:any){
        return await this.prisma.provider.findMany({where:{status:1}})
    }
}   