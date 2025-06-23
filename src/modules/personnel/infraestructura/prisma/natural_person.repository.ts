import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NaturalPersonRepository{
  constructor(private readonly prisma:PrismaService){}
    
  async createNaturalPerson(data:any){
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

  async updateNaturalPerson(data:any){
    return await this.prisma.natural_Person.update({
      where: { id: data.id },
      data: {
        registrationDate: data.registrationDate,
        description: data.description,
        status: data.status
      }
    })
  }

  async deleteNaturalPerson(data:any){
    return await this.prisma.natural_Person.update({
      where: { id: data.id },
      data: { status: data.status }
    });
  }
}