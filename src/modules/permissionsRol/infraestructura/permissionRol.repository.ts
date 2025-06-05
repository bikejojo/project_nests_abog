import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PermissionRolRepository{
    constructor(private readonly prisma:PrismaService){}

    async assingPermissionsRol(data:any){

    }
    
    async unsubcriptionPermissionRol(data:any){

    }
}