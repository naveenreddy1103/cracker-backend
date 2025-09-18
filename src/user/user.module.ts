import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/create-user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from 'src/config/jwt.config';
import { JwtStrategyUser } from './jwt.strategy';


@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtConfigModule,
    MongooseModule.forFeature([{name:'User',schema:UserSchema}])
  ],
  // providers are providing data to JwtStrategy for verify token
  providers: [UserService,JwtStrategyUser],
  controllers: [UserController],

  // exports the JwtStrategy to other folder
  exports:[JwtStrategyUser,PassportModule]
})
export class UserModule {}

