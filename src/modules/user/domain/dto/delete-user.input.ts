import {InputType , ObjectType , Field, Int} from '@nestjs/graphql';

@InputType()
export class DeleteUserInput {
    @Field(() => Int, {description: "ID de usuario a eliminar"})
    id: number;
}

@ObjectType()
export class DeleteUserOutput {
    @Field(() => Boolean, {description: "Indica el estado de la operacion de borrado"})
    success: boolean;

    @Field(() => String, {nullable: true, description: "Mensaje de confirmacion o error"})
    message?: string;

}