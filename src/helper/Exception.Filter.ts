import { ArgumentsHost , Catch ,ExceptionFilter , ForbiddenException  } from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";

@Catch(ForbiddenException)
export class GraphqlForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
       const gqlHost = GqlArgumentsHost.create(host);
       const originResponse = exception.getResponse() as any;

        return {
            message:originResponse.message ,
            status: originResponse.status
        }
    }
}
