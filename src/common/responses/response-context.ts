import { ResponseStrategy } from "./response-strategy.interface";

export class ResponseContext {
    private strategy:ResponseStrategy;

    setStrategy(strategy:ResponseStrategy){
        this.strategy = strategy
        return this;
    }

    executeStrategy(data:any){
        return this.strategy.buildResponse(data);
    }
}