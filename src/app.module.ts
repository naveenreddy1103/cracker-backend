import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { SuperAdminModule } from './super-admin/super-admin.module';



@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    ProductModule,
    AuthModule,
    UserModule,
    AddressModule,
    SuperAdminModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
