import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Auth } from "../../auth/schemas/vendor.schema";

// export enum category{
//     ADVENTURE="adventure",
//     CLASSICS="classics",
//     CRIME="crime"
// }

@Schema({timestamps:true})

export class Product{
    @Prop()
    productId:number

    @Prop()
    productName:String

    @Prop()
    brandName:String

    @Prop()
    images?:object[]

    @Prop()
    orignalPrice:number

    @Prop()
    discountPrice:number
    

    @Prop()
    category:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Auth'})
    auth:Auth
}

export const ProductSchema=SchemaFactory.createForClass(Product)