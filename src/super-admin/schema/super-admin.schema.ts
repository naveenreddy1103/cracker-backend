import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})

export class SuperAdmin{
    @Prop({required:true})
    adminName:string

    @Prop({required:true,unique:true})
    email:string

    @Prop({required:true})
    password:string
}

export const SuperAdminSchema=SchemaFactory.createForClass(SuperAdmin)