import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet())

  app.enableCors({
    origin:'*'
  })

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
