import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
// import { Address } from "src/address/schemas/address.schema";
import { Auth } from "src/auth/schemas/vendor.schema";
import { Product } from "src/product/schemas/product.schema";
import { User } from "src/user/schemas/create-user.schema";


export enum status{
    PROCESSING="processing",
    ACCEPTED="accepted",
    REJECTED="rejected",
    CANCEL="cancel"
}

// export enum paymentMode{
//     COD="Cash on delivery",
//     ONLINEPAYMENT="Online payment"
// }

@Schema({timestamps:true})

export class Orders{
    @Prop({required:true,unique:[true,"orderId must be unique"]})
    orderId:string

    // @Prop()
    // orderItems:Array<{
    //     productId:string,
    //     quantity:number,
    //     price:number
    // }>
    @Prop()
    orderDate:Date

    @Prop()
    deliveryAddress:string

    @Prop()
    status:status

    @Prop()
    subTotal:number

    @Prop()
    shippingCharge:number

    @Prop()
    totalAmount:number

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    userId:User

    @Prop({type:[mongoose.Schema.Types.ObjectId],ref:'Product'})
    products:Product[]

    // @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Address'})
    // addressId:Address

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Auth'})
    authId:Auth
}

export const OrderSchema = SchemaFactory.createForClass(Orders) 