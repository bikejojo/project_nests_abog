import { Injectable } from "@nestjs/common";
import { response } from "src/common/enum/typeResp";
import { filesService } from "./files.services";
import { ValidatorFilesService } from "./validatorFiles.services";
@Injectable()
export class documentsUseCase {
    constructor(
        private readonly fileService: filesService,
        private readonly fileValidator: ValidatorFilesService,
    ) {}

    async createDocuments(data:any){
        try {
            
            await this.fileValidator.validation(data.file);
            const fileUrl = await this.fileService.uploadFileService( data.id, data.file, data.type )
            if (!fileUrl) {
                return {
                    message: 'Error al subir el archivo',
                    status: response.FALL,
                    documents: null
                };
            }

            return {
                message: 'Archivo subido correctamente',
                status: response.NICE,
                documents: fileUrl
            }
        } catch (err) {
            console.log( 'Surgio problemas en CrtDoc y son ' + err.message );
            return {
                message: 'Surgio problemas en CrtDoc y son ' + err.message,
                status: response.WARN,
                documents: null
            }
        }
    }
}