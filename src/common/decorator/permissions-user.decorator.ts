import { SetMetadata } from "@nestjs/common";

export const CheckAccess = (ModuleName: String , MenuName: String , PermissionsName: String) => {
    SetMetadata('access',{ModuleName,MenuName,PermissionsName});
}