import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../infraestructura/prisma/user.repository";
import { CreateUserInput } from "../dto/create-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserInput } from "../dto/login-user.input";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../../../../auth/auth.service";
import { PersonRepository } from "src/modules/personnel/infraestructura/prisma/persona.repository";
import { LawyerRepository } from "src/modules/personnel/infraestructura/prisma/lawyer.repository";
import { typeUser } from "src/common/enum/typeUser";
@Injectable()
export class UserUseCase {
    constructor(
        private prisma:PrismaService , 
        private authService: AuthService ,
        private userRepository: UserRepository ,
        private personaRepository: PersonRepository ,
        private lawyerRepository: LawyerRepository 
    ) {}

    async login(data: LoginUserInput){
        const user = await this.userRepository.login(data.ci);
        console.log(user);
        if(!user){
            //throw new UnauthorizedException('El usuario no existe');
            return {
                message: 'El usuario no existe',
                status: 401 ,
                user: null
            }
        }

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            //throw new UnauthorizedException('Credenciales inválidas');
            return {
                message: 'Credenciales inválidas',
                status: 402,
                user: null
            }
        }

        if(user.status === 0){
            //throw new UnauthorizedException('Usuario inactivo');
            return {
                message: 'Usuario inactivo',
                status: 403,
                user: null
            }
        }

        if(user.token != '' ){
            return {
                message: 'Usuario inicio sesion en otro dipositivo',
                status: 404,
                user: null
            }
        }

        let jwtToken = await this.authService.generateToken(user);
        this.userRepository.saveToken(jwtToken.token , user );
        return {
            message: 'Inicio de sesión exitoso',
            status: 200,
            user: {
                name: user.name,
                ci: user.ci,
                type: user.type, // 1: empresa, 2: abogado, 3: admin
                token: jwtToken.token,
                //role: user.rols,
            },
        }
    }
    
    async logout (data:any){
        try {
                        
            const user = this.userRepository.logout(data.id);
            //console.log(user);
            return{
                message: 'Logout exitoso',
                status: 201 ,
                logoutData: user
            }
        }catch(err){
            return {
                message: 'Fallas en el logout' + err.message ,
                status: 501
            }
        }
    }

    async createPersonLawyerUser(data:any){
        try {
            
            const lawyerData = await this.lawyerRepository.findLawyerId({
                id: data.lawyerId
            });

            if(!lawyerData){
                return {
                    message:'Fallas en el obtencion de datos de abogado' ,
                    status: 1
                }
            }

            if(lawyerData.userId){
                return {
                    message:'El abogado se registro previamente.' ,
                    status: 1
                }
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await this.userRepository.createUser({
                name:`${lawyerData.persona.firstName}_${lawyerData.persona.lastName}` ,
                email: '',
                ci: lawyerData.persona.ci , 
                password: hashedPassword ,
                isActive: true,
                status: 1,
                type: typeUser.LawyerIntern ,
                token: '' ,
            })

            if(!user){
                return{
                    message:'El registro de user fue incorrecto !!!' ,
                    status: 1
                }
            }

            const lawyer = await this.lawyerRepository.updateLawyerUser({
                userId: user.id ,
                id: lawyerData.id
            })

            if(!lawyer){
                return{
                    message:'El registro de Lawyer fue incorrecto !!!' ,
                    status: 1
                }
            }
            
            return {
                message: 'registro existoso del usuario abogado. !!!',
                status: 2,
                personLawyUser: {
                    userData: user ,
                    lawyerData: lawyer,
                }
            }
        }catch(err){
            console.log('Fallas detectadas en CrPers y son:' + err.message)
            return {
                message: 'Fallas en CrPers: ' + err.message,
                status: 3 , 

            }
        }
    }
}