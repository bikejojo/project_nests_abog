import { CanActivate , ExecutionContext , Injectable , ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { response } from "src/common/enum/typeResp";

@Injectable()
export class PermissionsGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context:ExecutionContext):boolean{
        const requiredAccess = this.reflector.get('access',context.getHandler());
        
        if(!requiredAccess) return true

        const ctx = GqlExecutionContext.create(context);
        
        const req = ctx.getContext().req;
        const user = req.user;

        const hasModule = user.modules.some((mod: any) => mod.name === requiredAccess.moduleName);
        if (!hasModule) throw new ForbiddenException({ message: 'No tiene acceso al módulo requerido', status: response.WARN });

        const hasMenu = user.menus.some((menu: any) => menu.name === requiredAccess.menuName);
        if (!hasMenu) throw new ForbiddenException({ message: 'No tiene acceso al menú requerido', status: 403,  date: new Date(),});

        const hasPermission = user.permissions.some((perm: any) => perm.name === requiredAccess.permissionName);
        if (!hasPermission) throw new ForbiddenException({ message: 'No tiene el permiso requerido', status: 403,  date: new Date(),});

        return true;
    }
}