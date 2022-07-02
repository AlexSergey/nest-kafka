import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  CLIENT_ID,
  BROKER_URL,
  BROKER_URL_2,
  GROUP_ID,
} from '@app/kafka-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { path } from 'app-root-path';
import { join } from 'path';
import { KAFKA } from './app.constants';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { createSerializer } from '@app/serializer';
import { FAKE_GENERATOR_SCHEMA } from '@app/schemas';

const registry = new SchemaRegistry({ host: 'http://localhost:8085' });

const Serializer = createSerializer(registry, [FAKE_GENERATOR_SCHEMA]);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(path, 'static'),
      serveRoot: '/',
    }),
    ClientsModule.register([
      {
        name: KAFKA,
        transport: Transport.KAFKA,
        options: {
          serializer: new Serializer(),
          client: {
            clientId: CLIENT_ID,
            brokers: [BROKER_URL, BROKER_URL_2],
          },
          consumer: {
            groupId: GROUP_ID,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
