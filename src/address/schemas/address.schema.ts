import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/schemas/create-user.schema";


@Schema({timestamps:true})

export class Address{
    @Prop()
    fullName:string

    @Prop()
    phoneNumber:number

    @Prop()
    deliveryAddress:string

    @Prop()
    city:string

    @Prop()
    pincode:number

    @Prop()
    landmark:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User
}

export const AddressSchema=SchemaFactory.createForClass(Address)