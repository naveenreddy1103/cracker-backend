import { User } from "src/user/schemas/create-user.schema"
import { status } from "../schemas/order.schema"
import { Product } from "src/product/schemas/product.schema"
import { Auth } from "src/auth/schemas/vendor.schema"
import { ArrayNotEmpty, IsArray, IsDate, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Type } from "class-transformer"
// import { Address } from "src/address/schemas/address.schema"


export class CreateOrderDto {
    
        @IsNotEmpty()
        @IsString()
        readonly orderId:string

        @IsNotEmpty()
        @IsDate()
        @Type(() => Date)
        readonly orderDate:Date
    
        @IsNotEmpty()
        @IsString()
        readonly deliveryAddress:string
    
        @IsEmpty()
        readonly status:string
    
        @IsNotEmpty()
        @IsNumber()
        readonly subTotal:number
    
        @IsNotEmpty()
        @IsNumber()
        readonly shippingCharge:number
    
        @IsNotEmpty()
        @IsNumber()
        readonly totalAmount:number
    
        @IsEmpty({message:"we can't enter user id"})
        readonly userId:User
    
        @IsArray()
        @ArrayNotEmpty()
        @IsMongoId({ each: true })
        readonly products: string[];

        // @IsEmpty({message:"we can't enter address id"})
        // readonly addressId:Address
    
        @IsEmpty({message:"we can't enter auth id"})
        readonly authId:Auth
}