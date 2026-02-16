import { ObjectType , Field, Int} from "@nestjs/graphql";

@ObjectType()
export class allRols{
    @Field(()=>String,{nullable:true , description:'mensaje de retorno'})
    message: string

    @Field(()=>Int,{nullable:true , description:'estado del retorno'})
    status: number
    
    @Field(()=> [roles],{nullable:true} )
    response: roles[] | null
}

@ObjectType()
export class roles {
    @Field(()=>Int )
    id:number

    @Field(()=>String , {nullable:true , description:'el nombre del rol'})
    description: string
}