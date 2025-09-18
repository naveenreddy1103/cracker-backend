import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})

export class User extends Document{

    @Prop({required:true,unique:true})
    userName:string

    @Prop({required:true})
    fullName:string

    @Prop({unique:[true,"Duplicate email"]})
    email:string

    @Prop({required:true})
    phoneNumber:number

    @Prop({required:true})
    password:string
}

export const UserSchema= SchemaFactory.createForClass(User)