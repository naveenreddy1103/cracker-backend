import { Module } from '@nestjs/common';
import { AuthService } from './vendor.service';
import { AuthController } from './vendor.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/vendor.schema';
import { JwtConfigModule } from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtConfigModule,
    MongooseModule.forFeature([{name:"Auth",schema:AuthSchema}])
  ],
  // providers are providing data to JwtStrategy for verify token
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],

    // exports the JwtStrategy to other folders
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}
