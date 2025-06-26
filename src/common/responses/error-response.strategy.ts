import { ResponseStrategy } from "./response-strategy.interface";

// falla
// fallas en la base de datos por el momento de juez
export class ErrorResponseStrategy implements ResponseStrategy{
    buildResponse(data: any) {
        return {
            message: `Problemas en encontrar datos de ${data.objeto} en la base de datos`, status:data.status
        }
    }   
}