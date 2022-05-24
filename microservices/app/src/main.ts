import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

const PORT = process.env.APP_PORT ?? 3009;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({origin: '*'});
  await app.listen(process.env.PORT || PORT);
  console.log(`THE APP IS STARTED ON PORT ${PORT}`);
}
bootstrap();
