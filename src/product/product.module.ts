import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { AuthModule } from '../auth/vendor.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{name:'Product',schema:ProductSchema}]),
  ],
  providers: [ProductService],
  controllers: [ProductController]
  
})
export class ProductModule {}
