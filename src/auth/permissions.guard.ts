import { CanActivate , ExecutionContext , Injectable , ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class PermissionsGuard{
    constructor(private reflector:Reflector){}

    CanActivate(context:ExecutionContext):boolean{
        const requiredAccess = this.reflector.get('access',context.getHandler());
        if(!requiredAccess) return true

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const user = req.user;

        const hasModule = user.modules.some((mod: any) => mod.name === requiredAccess.moduleName);
        if (!hasModule) throw new ForbiddenException('No tiene acceso al módulo requerido');

        const hasMenu = user.menus.some((menu: any) => menu.name === requiredAccess.menuName);
        if (!hasMenu) throw new ForbiddenException('No tiene acceso al menú requerido');

        const hasPermission = user.permissions.some((perm: any) => perm.name === requiredAccess.permissionName);
        if (!hasPermission) throw new ForbiddenException('No tiene el permiso requerido');

        return true;
    }
}