import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FileEntity {
    id: number;
    name: string;
    size: number;
    type: string;
    url: string;
    createdAt: Date;
}