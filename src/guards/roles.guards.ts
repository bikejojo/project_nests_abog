import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!requiredRoles) return true;

        const ctx = GqlExecutionContext.create(context).getContext();
        const user = ctx.req.user;

        if(!user) return false;

        const userRoles = user.RolUser.map((ru) => ru.role.description);

        return requiredRoles.some((role) => userRoles.includes(role))
    }
}