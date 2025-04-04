import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Twilight Roses API')
    .setDescription('Documentation of TWILIGHT ROSES API')
    .addCookieAuth('access_token')
    .build();

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`Swagger: http://localhost:${port}/api\n`);
}

bootstrap();
