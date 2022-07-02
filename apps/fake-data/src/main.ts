import { NestFactory } from '@nestjs/core';
import { FakeServiceModule } from './fake-data.module';
import { Transport } from '@nestjs/microservices';
import {
  BROKER_URL,
  BROKER_URL_2,
  CLIENT_ID,
  GROUP_ID,
} from '@app/kafka-config';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { createDeserializer } from '@app/deserializer';
import { FAKE_GENERATOR_SCHEMA } from '@app/schemas';

async function bootstrap() {
  const registry = new SchemaRegistry({ host: 'http://localhost:8085' });
  const Deserealizer = createDeserializer(registry, [FAKE_GENERATOR_SCHEMA]);
  const app = await NestFactory.createMicroservice(FakeServiceModule, {
    transport: Transport.KAFKA,
    options: {
      deserializer: new Deserealizer(),
      client: {
        clientId: CLIENT_ID,
        brokers: [BROKER_URL, BROKER_URL_2],
      },
      consumer: {
        groupId: GROUP_ID,
      },
    },
  });
  await app.listen();
}
bootstrap();
