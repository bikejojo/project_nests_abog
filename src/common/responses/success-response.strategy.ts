import { ResponseStrategy } from "./response-strategy.interface";

// exito
// exito en la base de datos por el momento de juez
export class SucccessResponseStrategy implements ResponseStrategy {
    buildResponse(data: any) {
        return {
            message: `${data.type} ${data.message}`,
            status: data.status,
            response: data.content ?? null
        };
    }
}