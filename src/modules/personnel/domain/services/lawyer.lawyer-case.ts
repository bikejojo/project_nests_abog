import { Injectable } from "@nestjs/common";
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
                role: data.role,
                type: this.valueRol(data.role), // 1: empresa, 2: abogado, 3: admin
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
                LawyerCreate: lawyer,
                user:user
            }
        }catch(err){
            return {
                message:'Los errores de CrL son: ' + err.message,
                status: 501
            }

        }
    }

    valueRol(data:string){
        switch(data){
            case 'compania':
                return 1;
                break;
            case 'abogado':
                return 2;
                break;
            default:
                return 3;
                break;
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
                    message:'No se encontro al abogado',
                    status: 502
                }
            }

            if(lawyerExists.status === 0){
                return {
                    message:'El abogado ya tiene una cuenta desactivada',
                    status: 301
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
    //================   Querys   =================================

    async findIdLawyer(data:any){
        try {
            const findLawyer = await this.LawyerRepository.findLawyer(data.id)

            if(!findLawyer){
                return {
                    message:'No existe contenido de la compañia',
                    status : 401
                }
            }
            if(findLawyer.status === 0 ){
                return {
                    message:'La compalia se encuentra deshabilitada',
                    status : 301
                }
            }

            return {
                message: 'Se encontro los datos de la abogado escogida. ',
                status: 201,
                lawyerFind: findLawyer
            }
            
        }catch(err){
            return {
                message : 'Los errores de FnLw son: ' + err.message,
                status  : 501
            }
        }
    }

    async allStatusLawyer(){
        try{
            const allLawyer = await this.LawyerRepository.allLawyer();
            return {
                message: 'Resultados enviados.',
                status: 201 ,
                allLawyer: allLawyer
            }
        }catch(err){
            console.log('[LOG] errores de AlStaLaw' + err.message)
            return{
                message: 'Los siguientes errores AlStaLaw son errores : ' + err.message 
            }
        }
    }
}