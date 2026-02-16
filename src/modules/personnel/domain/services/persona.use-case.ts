import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/infraestructura/prisma/user.repository";
import { PersonRepository } from "../../infraestructura/prisma/persona.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class personaUseCase {
    constructor(
        private userRepository:UserRepository ,
        private personRepository:PersonRepository ,
    ){}
   
}