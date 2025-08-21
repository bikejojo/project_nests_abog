import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../infraestructura/prisma/user.repository";
import { CreateUserInput } from "../dto/create-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserInput } from "../dto/login-user.input";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../../../../auth/auth.service";
import { PersonRepository } from "src/modules/personnel/infraestructura/prisma/persona.repository";
import { typeUser } from "src/common/enum/typeUser";
import { response } from "src/common/enum/typeResp";
import { isStatus, status, tatus } from "src/common/enum/typeStatus";
import { ResponseContext } from "src/common/responses/response-context";
import { SucccessResponseStrategy } from "src/common/responses/success-response.strategy";
import { ErrorResponseStrategy } from "src/common/responses/error-response.strategy";
@Injectable()
export class UserUseCase {

    private responseContext: ResponseContext;

    constructor(
        private authService: AuthService ,
        private userRepository: UserRepository ,
        private personaRepository: PersonRepository ,
        private prisma: PrismaService
    ) {
         this.responseContext = new ResponseContext()
    }

    async login(data: LoginUserInput){
        try {
            const user = await this.userRepository.login(data.username);

            if(!user){
               
                return {
                    message: 'El usuario no existe',
                    status: response.FALL ,
                    user: null
                }
            }

            const validPassword = await bcrypt.compare(data.password, user.password);
            if (!validPassword) {
                return {
                    message: 'Credenciales inválidas',
                    status: response.FALL ,
                    user: null
                }
            }

            if(user.status === 0){
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

    async createUserPerson(data:CreateUserInput){
        let user:any = null;
        let person: any = null;
        const startTime = Date.now();

        try{
            const result  = await this.prisma.$transaction(
                async (tx) => {
                    const hashedPassword = await bcrypt.hash(data.password, 10);

                    user = await this.userRepository.createUser({
                        email: data.email,
                        password: hashedPassword,
                        token: '',
                        type: 0,
                        isActive: status.ACTIVE,
                        status: tatus.ACTIVE, 
                        rolId: null
                    },tx)
                    
                    const cityExists = await tx.city.findUnique({
                        where: { id: 1 }
                    });

                    if (!cityExists) {
                        throw new Error('City with id 1 does not exist');
                    }

                    person = await this.personaRepository.createPerson({
                        ci: data.ci,
                        firstName: data.firstname ,
                        lastName: data.lastname,
                        phone: '00000000' ,
                        address: 'S/N',
                        status: tatus.ACTIVE,
                        userId: user.id ,
                        cityId: cityExists.id,
                    }, tx)

                    return {
                        user: { ...user, person: person },
                        person,
                        success: true,
                        executionTime: Date.now() - startTime
                    };
                },{ maxWait: 10000, timeout: 5000 }
            );
            return this.responseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({
                type: 'Usuario',
                message: 'creado correctamente',
                status: response.NICE,
                content: result.user
            });
        }catch(err){
            return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
            type: 'Error',
            message: 'al crear usuario: ' + err.message,
            status: response.WARN,
            content: null
        });
        }
    }
}