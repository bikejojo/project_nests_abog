import { ResponseStrategy } from "./response-strategy.interface";

export class DataResponseStrategy implements ResponseStrategy {
    buildResponse(data: any) {
        return {
            message:`Dato: ${data.type} , no esta bien definido`,status:data.status
        }
    }
}