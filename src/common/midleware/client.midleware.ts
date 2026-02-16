import { Injectable  , NestMiddleware } from "@nestjs/common";
import { Response , Request , NextFunction } from "express";

function getClientIp(req: Request): string {
    const xff = (req.headers['x-forwarded-for'] as string ) || '';
    const forwarded = xff.split(',').map(ip => ip.trim()).filter(Boolean)[0];
    return forwarded || req.ip || (req.socket?.remoteAddress ?? '');
}

@Injectable()
export class ClientMiddleware implements NestMiddleware {
    use(req: Request, res: Response , next:NextFunction){
        req['client'] = {
            ip: getClientIp(req),
            userAgent: req.headers['user-agent'] || '',
        };

        next()
    }
}