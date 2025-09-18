import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/user.schema';
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
