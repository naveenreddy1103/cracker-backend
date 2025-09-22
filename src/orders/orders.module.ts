import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { ProductSchema } from 'src/product/schemas/product.schema';
import { AuthSchema } from 'src/auth/schemas/vendor.schema';
// import { AddressSchema } from 'src/address/schemas/address.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Orders',schema:OrderSchema}]),
      MongooseModule.forFeature([{name:'Product',schema:ProductSchema}]),
      MongooseModule.forFeature([{name:'Auth',schema:AuthSchema}]),
      // MongooseModule.forFeature([{name:'Address',schema:AddressSchema}]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
