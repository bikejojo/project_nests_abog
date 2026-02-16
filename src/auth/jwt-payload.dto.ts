export interface JwtPayloadUser {
    id: number;
    email: string | null;
    moduleUser: any[];
    menuUser: any[];
    permissionsUser: any[];
}
