import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { Orders } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private orderService:OrdersService
    ){}

    @Post('/:productId')
    @UseGuards(AuthGuard('jwt-user'))
    async createOrder(
        @Body()
        orders:CreateOrderDto,
        @Param('productId') productId:string,
        // @Param('addressId') addressId:string,
        @Req() req
    ):Promise<any>{
        return this.orderService.createOrder(orders,productId,req.user)
    }
}
