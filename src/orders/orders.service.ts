import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders } from './schemas/order.schema';
import mongoose from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
// import { Address } from 'src/address/schemas/address.schema';
import { User } from 'src/user/schemas/create-user.schema';
import { Auth } from 'src/auth/schemas/vendor.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders.name)
        private orderModel: mongoose.Model<Orders>,
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>,
        // @InjectModel(Address.name)
        // private addressModel:mongoose.Model<Address>,

    ) { }

    // create order
    async createOrder(
        order: CreateOrderDto,
        user: User
    ): Promise<any> {
        // Validate product IDs
        const products = await this.productModel.find({
            _id: { $in: order.products }
        });

        if (products.length !== order.products.length) {
            throw new UnauthorizedException('One or more products not found');
        }

        const data = await this.orderModel.create({
            ...order,
            products: order.products, // Store array of product ObjectIds
            userId: user._id,
            status: 'processing'
        });

        return data;
    }

    // cancel order
    async cancelOrder(
        orderId:string,
        user:User
    ):Promise<string>{
        const order=await this.orderModel.findOne({_id:orderId,userId:user._id})
        if(!order){
            throw new NotFoundException("order not found")
        }

        await this.orderModel.findByIdAndUpdate(order._id,{status:"cancel"},{new:true})
        return "order cancelled"
    }

    // get all orders by user
    async getAllOrdersByUser(
        user:User
    ):Promise<Orders[]>{
        const orders=await this.orderModel.find({userId:user._id})
        .populate('products')
        if(!orders){
            throw new NotFoundException("orders not found")
        }
        return orders
    }


    // vendor order status update
    async vendorStatusUpdate(
        status:string,
        orderId:string,
        auth:Auth
    ):Promise<string>{
        const order=await this.orderModel.findOne(
            {_id:orderId,
                authId:auth._id,
                status:{$ne:"cancel"}
            }
        )
        if(!order){
            throw new NotFoundException("order not found")
        }
        if(status==="accepted"){
            await this.orderModel.findByIdAndUpdate(
                order._id,
                {status:"accepted"},
                {new:true}
            )
            return "order accepted"
        }
        else if(status==="rejected"){
            await this.orderModel.findByIdAndUpdate(
                order._id,
                {status:"rejected"},
                {new:true}
            )
            return "order rejected"
        }
        else{
            throw new UnauthorizedException("staus must be accepted or rejected")
        }

        return "status updated"
    }

    // view all orders  by vendor related to his products
    async getAllOrdersByVendor(
        auth:Auth
    ):Promise<Orders[]>{
        const orders=await this.orderModel.find({authId:auth._id})
        .populate('products')
        if(!orders){
            throw new NotFoundException("orders not found")
        }
        return orders
    }


}
