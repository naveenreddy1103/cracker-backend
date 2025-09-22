import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})

export class Auth extends Document{
    @Prop({required:true})
    name:string

    @Prop({unique:[true,"Duplicate email"]})
    email:string

    @Prop({required:true})
    password:string
}

export const AuthSchema= SchemaFactory.createForClass(Auth)