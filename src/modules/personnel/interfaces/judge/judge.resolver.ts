import { Mutation , Query , Resolver , Args  } from "@nestjs/graphql";
import { createJudgeInput , createJudgeOutPut } from "../../domain/dto/judge/create-judge.input";
import { updateJudgeInput, updateJudgeOutPut } from "../../domain/dto/judge/update-judge.input";
import { JudgeUseCase } from "../../domain/services/judge.use-case";
import { Judge } from "../../entities/judge.entity";
import { deleteJudgeInput, deleteJudgeOutPut } from "../../domain/dto/judge/delete-judge.input";
import { inactiveJudgeInput, inactiveJudgeOutPut } from "../../domain/dto/judge/inactive-judge.input";

@Resolver(()=> Judge)
export class JudgeResolver {
    constructor (
        private readonly judgeUseCase:JudgeUseCase
    ){}

    @Mutation(()=>createJudgeOutPut)
    async createJudge(@Args('data') data:createJudgeInput){
        return await this.judgeUseCase.createJudge(data)
    }
    
    @Mutation(()=>updateJudgeOutPut)
    async updateJudge(@Args('data') data:updateJudgeInput){
        return await this.judgeUseCase.updateJudge(data)
    }

    @Mutation(()=>deleteJudgeOutPut)
    async deleteJudge(@Args('data') data:deleteJudgeInput ){
        return await this.judgeUseCase.deleteJudge(data)
    }

    @Mutation(()=>inactiveJudgeOutPut)
    async inactiveJudge(@Args('data') data:inactiveJudgeInput ){
        return await this.judgeUseCase.inactiveJudge(data)
    }
    
}