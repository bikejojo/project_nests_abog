import { Resolver , Mutation , Query , Args } from "@nestjs/graphql";
import { Permissions } from "../entities/permissions.entities";

@Resolver(()=>Permissions)
export class PermissionsResolver {

}
