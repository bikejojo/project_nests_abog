import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class NaturalPersonRepository{
  constructor(
    private readonly prisma:PrismaService 
  ){}
    
  async createNaturalPerson(prisma: Prisma.TransactionClient ,data:any){
    return await this.prisma.natural_Person.create({
      data:{
        registrationDate: data.registrationDate,
        description: data.description,
        status: data.status,
        personId: data.personId
      }
    })
  }

  async findIdNaturalPerson(data:any){
    return await this.prisma.natural_Person.findUnique({
      where: { id: data.id }
    });
  }

  async updateNaturalPerson(prisma: Prisma.TransactionClient,data:any){
    return await prisma.natural_Person.update({
      where: { id: data.id },
      data: {
        registrationDate: data.registrationDate,
        description: data.description,
        status: data.status
      }
    })
  }

  async deleteNaturalPerson(prisma: Prisma.TransactionClient ,data:any){
    return await prisma.natural_Person.update({
      where: { id: data.id },
      data: { status: data.status }
    });
  }
}