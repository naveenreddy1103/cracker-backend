import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './schemas/address.schema';
import { UserModule } from 'src/user/user.module';
// import { OrdersService } from 'src/orders/orders.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Address',schema:AddressSchema}])
  ],
  controllers: [AddressController],
  providers: [AddressService],
  // exports:[OrdersService]
})
export class AddressModule {}
