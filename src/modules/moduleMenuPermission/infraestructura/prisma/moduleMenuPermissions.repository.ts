import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ModuleMenuPermissionsRepository {
    constructor ( private readonly prisma: PrismaService){}

    async listAllModuleMenuPermissions(){
        return await this.prisma.module.findMany({
            include:{
                moduleMenu: {
                    include: {
                        menu: {
                            include: {
                                menuPermissions: {
                                    include: {
                                        permissions: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}