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

    }
    async deleteProvider(data:any){

    }
    //query
    async findIdProvider(data:any){}
    async allStatusProvider(data:any){}
}