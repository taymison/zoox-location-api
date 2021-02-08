import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LocalizeGeneratedDatesInterceptor } from './interceptors/localize-generated-dates.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LocalizeGeneratedDatesInterceptor());
  await app.listen(3000);
}
bootstrap();
