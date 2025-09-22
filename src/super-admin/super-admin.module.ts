import { Module } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminController } from './super-admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from './schema/super-admin.schema';
import { JwtConfigModule } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'SuperAdmin',schema:SuperAdminSchema}]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtConfigModule
  ],
  providers: [SuperAdminService],
  controllers: [SuperAdminController]
})
export class SuperAdminModule {}
