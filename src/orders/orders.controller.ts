import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { Orders } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private orderService:OrdersService
    ){}

    @Post()
    @UseGuards(AuthGuard('jwt-user'))
    async createOrder(
        @Body()
        orders:CreateOrderDto,
        // @Param('addressId') addressId:string,
        @Req() req
    ):Promise<any>{
        return this.orderService.createOrder(orders,req.user)
    }

    // cancel order
    @Patch('/cancel/:orderId')
    @UseGuards(AuthGuard('jwt-user'))
    async cancelOrder(
        @Param('orderId') orderId:string,
        @Req() req
    ):Promise<string>{
        return this.orderService.cancelOrder(orderId,req.user)
    }

    // get all orders by user
    @Get('/user/allOrders')
    @UseGuards(AuthGuard('jwt-user'))
    async getAllOrdersByUser(
        @Req() req
    ):Promise<Orders[]>{
        return this.orderService.getAllOrdersByUser(req.user)
    }


    // vendor order status update 

    @Patch('/vendorStatus/:status/:orderId')
    @UseGuards(AuthGuard('jwt-auth'))
    async vendorStatusUpdate(
        @Param('status') status:string,
        @Param('orderId') statusId:string,
        @Req() req
        ):Promise<string>{
            return this.orderService.vendorStatusUpdate(status,statusId,req.user)
        }


        // view all orders  by vendor related to his products
        @Get('vendor/allOrders')
        @UseGuards(AuthGuard('jwt-auth'))
        async getAllOrdersByVendor(
            @Req() req
        ):Promise<Orders[]>{
            return this.orderService.getAllOrdersByVendor(req.user)
        }

}
