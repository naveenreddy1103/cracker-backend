import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders } from './schemas/order.schema';
import mongoose from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
// import { Address } from 'src/address/schemas/address.schema';
import { User } from 'src/user/schemas/create-user.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders.name)
        private orderModel:mongoose.Model<Orders>,
        @InjectModel(Product.name)
        private productModel:mongoose.Model<Product>,
        // @InjectModel(Address.name)
        // private addressModel:mongoose.Model<Address>,
        
    ){}

    // create order
    async createOrder(
        order:CreateOrderDto,
        productId:string,
        user:User,
        // addressId:string
    ):Promise<any>{

        // checking product id is valid or not
        const productObjectId= await this.productModel.findById(productId)
        if(!productObjectId){
            throw new UnauthorizedException("Product not found")
        }

        // checking address id is valid or not
        // const addressObjectId= await this.addressModel.findById(addressId)
        // if(!addressObjectId){
        //     throw new UnauthorizedException("Address not found")
        // }
        
        // // verify the address is related to user or not
        // const userId=user._id
        // if(addressObjectId.user.toString() !== (userId.toString())){
        //     throw new UnauthorizedException("You are not authorized to access this address")
        // }
    

        // destructuring order dto
        const {orderId,orderDate,deliveryAddress,status,subTotal,shippingCharge,totalAmount}=order
       const data= await this.orderModel.create({
        orderId,
        orderDate,
        deliveryAddress,
        status:"processing",
        subTotal,
        shippingCharge, 
        totalAmount,
        productId: productObjectId._id,
        userId:user,
        // addressId:addressObjectId._id,
        authId:productObjectId.auth
       })
       return data
   
    }
    
}
