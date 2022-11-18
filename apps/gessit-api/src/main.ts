/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ValidationFilter } from './app/shared/filters/validation.filter';
import { ValidationException } from './app/shared/filters/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalFilters(new ValidationFilter);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(
        error => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`
      )

      return new ValidationException(messages);
    }
  }));
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
