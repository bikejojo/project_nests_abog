import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { CompanyRepository } from "../../infraestructura/prisma/company/company.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyUseCase {
    constructor(
        private CompanyRepository: CompanyRepository,
        private userRepository: UserRepository,
        private authService: AuthService
    ){}

    async createCompany(data: any){
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.createUser({
            email: data.email,
            password: hashedPassword,
            name: data.name,
            token: '',
            role: 'Company',
            type: 1, // 1: empresa, 2: abogado, 3: admin
            isActive: true,
            status: 1, // 1: activo, 0: inactivo
        });

        
        if (!user) {
            return {
                message: 'Error al crear el usuario',
                status: 500,
                company: null
            };
        }

        const userId = user.id;

        const company = await this.CompanyRepository.createCompany({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            status: 1 ,
            userId: userId,
        });

        if (!company) {
            return {
                message: 'Error al crear la empresa',
                status: 500,
                company: null
            };
        }

        return {
            message: 'Empresa creada exitosamente',
            status: 201,
            company: company,
            user: user
        };
    }

    async updateCompany(data: any){
        //verificacion
        const companyId = await this.CompanyRepository.findCompany(data.id);
        if(!companyId){
            return {
                message: 'No existen datos de la empresa',
                status: 401
            }
        }
        const company = await this.CompanyRepository.updateCompany(data);
            return{
                message: 'Datos actualizados correctamente',
                status: 201,
                updateDataCompany: company
            }
    }

    async deleteCompany(data: any){
        //verificacion
        const companyId = await this.CompanyRepository.findCompany(data.id);
        if(!companyId){
            return {
                message: 'No existen datos de la empresa',
                status: 401
            }
        }

        const company  =await this.CompanyRepository.deleteCompany(data)
    }

}