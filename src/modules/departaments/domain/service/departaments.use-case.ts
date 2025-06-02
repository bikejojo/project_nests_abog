import { Injectable ,  } from "@nestjs/common";
import { departamentsRepository } from "../../infraestructura/prisma/departaments.repository";

@Injectable()
export class departamentsUseCase{
    constructor(private DepartamentsRepository:departamentsRepository){};

    async createDepartaments(data:any){
        try{
            const deparmants  =this.DepartamentsRepository.createdDepartaments({
                data:{
                    name:data.name,
                    description:data.description,
                    status: 1 ,
                    createdAt: new Date ,
                    updatedAt: new Date 
                }
            })

            return {
                message: 'Se creo exitosamente el objeto departamento',
                status: 201,
                departaments: deparmants
            }
        }catch(err){
            return {
                message: 'Fallas en CrtDep son: ' + err.message,
                status: 501
            }
        }
    }
    async updateDepartaments(data:any){
        try{
            const departamentsId = await this.DepartamentsRepository.findIdDepartaments(data);

            if(!departamentsId){
                return {
                    message:'No se encontro objeto buscado.',
                    status:301
                }
            }

            const departaments = await this.DepartamentsRepository.updatedDepartaments(data);

            if(!departaments){
                return {
                    message:'Objeto no creado',
                    status:302
                }
            }

            return {
                message: 'Se creo con exito el departament.',
                status:201,
                deparmentsDatas:departaments
            }
        }catch(err){
            console.log('[LOG] se encontraron problemas y estos son: ' + err.message)
            return{
                message: 'Fallas encontradas UpdDep son: ' + err.message,
                status: 401,
            }
        }
    }
    async deleteDepartaments(data:any){
        try{
            const deparDelId = await this.DepartamentsRepository.findIdDepartaments(data);
            if(deparDelId?.status === 0){
                return {
                    message:'Este objeto fue dado como deshabilitado.',
                    status:301
                }
            }

            const departaments = await this.DepartamentsRepository.deletedDepartaments(data)
            return{
                message: 'Objeto deshabilidato exitosamente.',
                status: 201,
                departaments: departaments
            }

        }catch(err){
            console.log('[LOG] Se presentaron las siguientes fallas: ' + err.message);
            return {
                message: 'Fallas en DelDep son: ' + err.message,
                status: 401
            }
        }
    }
    async findIdDepartaments(data:any){
        try{
            
        }catch(err){

        }

    }
    async allDepartments(){
        try{

        }catch(err){

        }}
}