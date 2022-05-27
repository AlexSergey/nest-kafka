import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BROKER_URL, CLIENT_ID } from './config/kafka.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: CLIENT_ID,
        brokers: [BROKER_URL],
      },
      consumer: {
        groupId: 'hero-consumer',
        eachMessage: async ({ topic, partition, message }) => {
          console.log('eachMessage', topic, message)
        }
      }
    }
  });
  await app.listen();
}
bootstrap();
