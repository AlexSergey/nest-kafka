import { NestFactory } from '@nestjs/core';
import { ImageServiceModule } from './image-processing.module';

async function bootstrap() {
  const app = await NestFactory.create(ImageServiceModule);
  await app.listen(3002);
}
bootstrap();
