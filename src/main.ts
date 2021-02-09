import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LocalizeGeneratedDatesInterceptor } from './interceptors/localize-generated-dates.interceptor';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.ENV === 'prod') {
    app.use(helmet());
    app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
      }),
    );
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LocalizeGeneratedDatesInterceptor());

  const config = new DocumentBuilder()
    .addApiKey({type: 'apiKey', name: 'X-Api-Key', in: 'header'}, 'X-Api-Key')
    .setTitle('Zoox Location API')
    .setDescription('The unofficial Zoox API for locations')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
