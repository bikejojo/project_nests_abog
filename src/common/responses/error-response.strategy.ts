import { response } from "../enum/typeResp";
import { ResponseStrategy } from "./response-strategy.interface";

// falla
// fallas en la base de datos por el momento de juez
export class ErrorResponseStrategy implements ResponseStrategy {
    buildResponse(data: any) {
        return {
            message: `${data.type}: ${data.message}`,
            status: response.FALL ,
            response: data.content
        };
    }
}