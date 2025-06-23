import { ObjectType , Field , ID } from "@nestjs/graphql";
import { Module } from "./module.entity";
import { User } from "../../../modules/user/entities/user.entity";

@ObjectType()
export class ModuleUser {
    @Field(()=> ID)
    id: number

    @Field()
    status:number

    @Field(()=>ID)
    moduleId: number

    @Field(()=>ID)
    userId: number
    
    @Field()
    modules: Module

    @Field()
    users: User
}