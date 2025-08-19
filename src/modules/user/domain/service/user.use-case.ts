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
import { response } from "src/common/enum/typeResp";
import { status, tatus } from "src/common/enum/typeStatus";
@Injectable()
export class UserUseCase {
    constructor(
        private prisma: PrismaService,
        private authService: AuthService ,
        private userRepository: UserRepository ,
        private personaRepository: PersonRepository ,
        private lawyerRepository: LawyerRepository 
    ) {}

    async login(data: LoginUserInput){
        try {
            const user = await this.userRepository.login(data.username);

            if(!user){
                //throw new UnauthorizedException('El usuario no existe');
                return {
                    message: 'El usuario no existe',
                    status: response.FALL ,
                    user: null
                }
            }

            const validPassword = await bcrypt.compare(data.password, user.password);
            if (!validPassword) {
                //throw new UnauthorizedException('Credenciales inválidas');
                return {
                    message: 'Credenciales inválidas',
                    status: response.FALL ,
                    user: null
                }
            }

            if(user.status === 0){
                //throw new UnauthorizedException('Usuario inactivo');
                return {
                    message: 'Usuario inactivo',
                    status: response.FALL ,
                    user: null
                }
            }

            const module = await this.userRepository.findModuleUsersId({
                userId: user.id
            })

            const userModules = module.map(m => ({
                id: m.modules?.id ,
                name: m.modules?.name
            }));
            
            const menu = await this.userRepository.findMenuUserId({
                userId:user.id
            })

            const userMenu = menu.map(m => ({
                id: m.menu?.id,
                name: m.menu?.name,
            }))
            const permissions = await this.userRepository.findPermissonsUserId({
                userId: user.id
            })

            const userPermissions = permissions.map( p => ({
                id: p.permissions?.id,
                name: p.permissions?.name
            }));

            const user1 = await this.userRepository.findIdUserContent({id:user.id});
            const payloadUser = {
                id: user.id,
                email: user.email,
                modules: (user1?.moduleUser ?? []).map(m => m.modules),
                menus: (user1?.menuUser ?? []).map(m => m.menu),
                permissions: (user1?.permissionsUser ?? []).map(p => p.permissions)
            };
            //console.log('b',payloadUser)
            let jwtToken = await this.authService.generateToken(payloadUser);
            //console.log('a',jwtToken);
            this.userRepository.saveToken(jwtToken.token , user );
            return {
                message: 'Inicio de sesión exitoso',
                status: response.NICE ,
                user: {
                    id:user.id ,
                    name: user.name,
                    ci: user.ci,
                    type: user.type, // 1: empresa, 2: abogado, 3: admin
                    token: jwtToken.token,
                    //role: user.rols,
                    module:userModules ,
                    menu: userMenu ,
                    permissions: userPermissions
                },
            }
        }catch(err){
            console.log('Fallas en Login, son: ' + err.message);
            return {
                message: 'Fallas en Login, son: ' + err.message,
                status: response.FALL,
            }
        }
    }
    
    async logout (data:any){
        try {
                        
            const user = this.userRepository.logout(data.id);
            //console.log(user);
            return{
                message: 'Logout exitoso',
                status: response.FALL ,
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
            const lawyerIds = parseInt(data.lawyerId);

            const lawyerData = await this.lawyerRepository.findLawyerId({
                id: lawyerIds
            });

            //console.log(lawyerData)
                ;
            if(!lawyerData){
                return {
                    message:'Fallas en el obtencion de datos de abogado' ,
                    status: response.FALL
                }
            }

            if(lawyerData.userId){
                return {
                    message:'El abogado se registro previamente.' ,
                    status: response.FALL
                }
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await this.userRepository.createUser({
                name: data.name ,//`${lawyerData.persona.firstName}_${lawyerData.persona.lastName}` ,
                email: data.email,
                ci: lawyerData.persona.ci , 
                password: hashedPassword ,
                isActive: status.ACTIVE,
                status: tatus.ACTIVE,
                type: typeUser.LawyerIntern ,
                token: '' ,
                roleId: data.roleId
            })

            if(!user){
                return{
                    message:'El registro de user fue incorrecto !!!' ,
                    status: response.FALL
                }
            }
            await this.prisma.$transaction(async (prisma) => {
                 const lawyer = await this.lawyerRepository.updateLawyerUser(prisma,{
                    userId: user.id ,
                    id: lawyerData.id ,
                    branchOfficeId: data.branchOfficeId
                })

                if(!lawyer){
                    return{
                        message:'El registro de Lawyer fue incorrecto !!!' ,
                        status: response.FALL
                    }
                }

                return {
                    message: 'registro existoso del usuario abogado. !!!',
                    status: response.NICE ,
                    personLawyUser: {
                        userData: user ,
                        lawyerData: lawyer,
                    }
                }
            })
            
        }catch(err){
            console.log('Fallas detectadas en CrPers y son:' + err.message)
            return {
                message: 'Fallas en CrPers: ' + err.message,
                status: response.WARN , 

            }
        }
    }
}