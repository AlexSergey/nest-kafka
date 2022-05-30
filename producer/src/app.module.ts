import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { KAFKA_SERVICES, CLIENT_ID, BROKER_URL } from './config/kafka.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICES.HELLO,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [BROKER_URL],
          },
          consumer: {
            groupId: 'hero-producer'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
