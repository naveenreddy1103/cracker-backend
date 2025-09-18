import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './schemas/address.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
    MongooseModule.forFeature([{name:'Address',schema:AddressSchema}])
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
