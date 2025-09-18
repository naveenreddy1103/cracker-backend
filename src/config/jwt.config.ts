// src/config/jwt.config.ts
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const JwtConfigModule = JwtModule.registerAsync({
//   imports: [ConfigModule],
  inject: [ConfigService],   // without this we can't access env
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('JWT_SCERET'), // ✅ Fix spelling if it was SCERET
    signOptions: {
      expiresIn: config.get<string | number>('JWT_EXPIRES'),
    },
  }),
});
        
   