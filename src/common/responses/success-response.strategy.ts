import { response } from "../enum/typeResp";
import { ResponseStrategy } from "./response-strategy.interface";

export class SucccessResponseStrategy implements ResponseStrategy {
    buildResponse(data: any) {
        return {
            message: `${data.type} ${data.message}`,
            status: response.NICE ,
            response: data.content ?? null
        };
    }
}