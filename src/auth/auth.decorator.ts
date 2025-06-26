import { createParamDecorator , ExecutionContext } from "@nestjs/common";
import { Context, GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator((data, Context:ExecutionContext) => {
    const ctx = GqlExecutionContext.create(Context);
    return ctx.getContext().req.user;
});