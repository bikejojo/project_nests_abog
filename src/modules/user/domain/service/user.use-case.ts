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
import { UpdateUserPersonInput } from "../dto/update-user.input";
import { DeleteUserInput } from "../dto/delete-user.input";
import { MenuUser } from "src/modules/moduleMenuPermission/entities/menuUser.entity";
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
                moduleUser: (user1?.moduleUser ?? []).map(m => m.modules),
                menuUser: (user1?.menuUser ?? []).map(m => m.menu),
                permissionsUser: (user1?.permissionsUser ?? []).map(p => p.permissions)
            };

            let jwtToken = await this.authService.generateToken(payloadUser); 
            this.userRepository.saveToken(jwtToken.token , jwtToken.refreshToken , user );

            return {
                message: 'Inicio de sesión exitoso',
                status: response.NICE ,
                user: {
                    id:user.id ,
                    type: user.type, // 1: empresa, 2: abogado, 3: admin
                    token: jwtToken.token,
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
        let user:any    = null;
        let person:any  = null;

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
                        executionTime: Date.now()
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

    async updateUserPerson(data:UpdateUserPersonInput){
        let user:any     = null;
        let person:any   = null;
        
        try {
            const verificationPerson = await this.personaRepository.findedPersona({id:data.id});
            
            if(!verificationPerson){
                return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    type: 'Error',
                    message: 'Persona no encontrada',
                    status: response.FALL,
                    content: null
                });
            }

            const result = await this.prisma.$transaction(
                async (tx) => {
                    user = await this.userRepository.updateUser({
                        id: verificationPerson?.userId,
                        email: data.email ?? verificationPerson.user?.email,
                        password: data.password ? await bcrypt.hash(data.password, 10) : verificationPerson.user?.password,
                        type: verificationPerson.user?.type,
                        isActive: verificationPerson.user?.isActive,
                        status: verificationPerson.user?.status,
                    },tx)

                    if(!user){
                        throw new Error('Error al actualizar el usuario');
                    }

                    person = await this.personaRepository.updatePersona(tx,{
                        id: verificationPerson?.id,
                        ci: data.ci ?? verificationPerson?.ci,
                        firstName: data.firstName ?? verificationPerson?.firstName,
                        lastName: data.lastName ?? verificationPerson?.lastName,
                        phone:  verificationPerson?.phone,
                        address: verificationPerson?.address,
                        status: verificationPerson?.status,
                    })

                    return {user , person};
                }

            )

            return this.responseContext.setStrategy(new SucccessResponseStrategy()).executeStrategy({
                type: 'Usuario',
                message: 'actualizado correctamente',
                status: response.NICE,
                content: {
                    userId: result.user.id,
                    email: result.user.email,
                    firstName: result.person.firstName,
                    lastName: result.person.lastName,
                    ci: result.person.ci
                }
            });

        } catch(err){
            return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                type: 'Error',
                message: 'al actualizar usuario: ' + err.message,
                status: response.WARN,
                content: null
            });
        }
    }

    async deleteUserPerson(data:DeleteUserInput){
        let user:any = null;
        let person:any = null;

        try {
            const verificationPerson = await this.personaRepository.findedPersona({id:data.id})
            
            if(verificationPerson === null){
                return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                    message: 'Persona no encontrada',
                    status: response.FALL,
                    response: null
                });
            }

            const result  = await this.prisma.$transaction(
                async (tx) => {
                    user = await this.userRepository.deleteUserFind({id:verificationPerson.userId},tx);
                    
                }
            )
        } catch(err){
            return this.responseContext.setStrategy(new ErrorResponseStrategy()).executeStrategy({
                message: 'al eliminar usuario: ' + err.message,
                status: response.WARN,
                response: null
            });
        }
    }

    async refreshUser(refreshTokenData: any){
        try{
            const refreshToken = refreshTokenData.refreshToken || refreshTokenData.token;

            const newTokens = await this.authService.refreshAccessToken(refreshToken);

            const user = await this.userRepository.findIdUsers({id:refreshTokenData.id})

                    if (!user) {
            return {
                message: 'Usuario no encontrado',
                status: response.FALL,
                token: null,
                refreshToken: null
            };
        }

        // Guardar el nuevo refresh token en la base de datos
        await this.userRepository.saveToken(newTokens.token, newTokens.refreshToken, user);

        return {
            message: 'Tokens renovados exitosamente',
            status: response.NICE,
            token: newTokens.token,
            refreshToken: newTokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                type: user.type
            }
        };
        }catch(err){

        }
    }
}