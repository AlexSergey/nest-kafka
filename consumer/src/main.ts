import { NestFactory } from '@nestjs/core';
import { Transport, KafkaParser } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BROKER_URL, BROKER_URL_2, CLIENT_ID } from './config/kafka.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [BROKER_URL, BROKER_URL_2],
      },
      consumer: {
        groupId: 'hero-consumer'
      },
      parser: new KafkaParser({
        keepBinary: true
      })
    }
  });
  await app.listen();
}
bootstrap();
