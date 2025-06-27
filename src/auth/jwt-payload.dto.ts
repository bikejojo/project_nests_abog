export interface JwtPayloadUser {
    id: number;
    email: string | null;
    modules: any[];
    menus: any[];
    permissions: any[];
}
