import { ResponseStrategy } from "./response-strategy.interface";

export class SucccessResponseStrategy implements ResponseStrategy {
    buildResponse(data: any) {
        return {
            message: `${data.type} ${data.message}`,
            status: data.status,
            response: data.content ?? null
        };
    }
}