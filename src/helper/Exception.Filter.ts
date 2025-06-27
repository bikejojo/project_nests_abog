import { ArgumentsHost , Catch ,ExceptionFilter , ForbiddenException  } from "@nestjs/common";
import { GqlArgumentsHost , GqlExceptionFilter} from "@nestjs/graphql";

@Catch(ForbiddenException)
export class GraphqlForbiddenExceptionFilter implements GqlExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
       const gqlHost = GqlArgumentsHost.create(host);
       const originResponse = exception.getResponse() as any;

        return {
            message:originResponse.message ,
            status: originResponse.status
        }
    }
}
