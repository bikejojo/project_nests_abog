import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Agrega tus dominios
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept','X-Requested-With','apollo-require-preflight'],
  });
  await app.listen(process.env.PORT ?? 3000 , '0.0.0.0');
}
bootstrap();
