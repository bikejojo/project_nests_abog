import { ResponseStrategy } from "./response-strategy.interface";

// Peligro
// Peligro de algun datos no encontrado en el codigo o base de datos
export class WarningResponseStrategy implements ResponseStrategy {
    buildResponse(data: any) {
        return {
            message: `Fallas en ${data.name} y son: ${data.message}`, status: data.status
        }
    }
}