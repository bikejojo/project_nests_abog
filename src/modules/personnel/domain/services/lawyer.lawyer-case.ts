import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth.service";
import { LawyerRepository } from "../../infraestructura/prisma/lawyer/lawyer.repository";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LawyerUseCase {
    constructor(
        private authService: AuthService ,
        private LawyerRepository: LawyerRepository,
        private userRepository: UserRepository
    ){}

    async createdLawye(data:any){
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.userRepository.createUser({
                email: data.email,
                password: hashedPassword,
                name: `${data.firstName} ${data.lastName}`,//data.firstName + ' ' + data.lastName,
                token: '',
                role: 'Company',
                type: 1, // 1: empresa, 2: abogado, 3: admin
                isActive: true,
                status: 1, // 1: activo, 0: inactivo
            })
            if(!user){
                return {
                    message: 'Error al crear el usuario',
                    status: 500,
                    company: null
                }; 
            }

            const userId = user.id;

            const lawyer = await this.LawyerRepository.createLawyer({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                userId: userId,
                status: 1
            })

            return {
                message: 'Creacion de Abogado exitosa',
                status: 201,
                LawyerCreate: lawyer
            }
        }catch(err){
            return {
                message:'Los errores de CrL son: ' + err.message
            }

        }
    }

    async updatedLawyer(data:any){
        try {
            const LawyerExists = await this.LawyerRepository.findLawyer(data.id);
            
            if(!LawyerExists){
                return{
                    message:'No existen datos de abogados'
                }
            }
            const userId = LawyerExists.userId;
            const LawyerUpdate = this.LawyerRepository.updateLawyer(data , userId);

            return {
                message:'Actualizacion exitosa!',
                status: 201,
                updateLawyer:LawyerUpdate               
            }
        }catch(err){
            return {
                message:'Los errores de UpL son: ' + err.message
            }

        }
    }

    async deletedLawye(data:any){
        try {
            //console.log(data)
            //process.exit()
            const lawyerExists = await this.LawyerRepository.findLawyer(data.id);
            if(!lawyerExists){
                return {
                    message:'No se encontro al abogado'
                }
            }

            if(lawyerExists.status === 0){
                return {
                    message:'El abogado ya tiene una cuenta desactivada'
                }
            }
            const lawyer = await this.LawyerRepository.deleteLawyer(lawyerExists.id)
            
            const userLawyer = await this.userRepository.deleteUserFind(lawyerExists.userId)
            console.log(lawyer)
            return {
                message: 'Eliminacion correcta del abogado',
                status: 201 ,
                deleteLawyer: lawyer
            }
        }catch(err){
            return {
                message:'Los errores de DeL son: ' + err.message,
            }

        }
    }

}