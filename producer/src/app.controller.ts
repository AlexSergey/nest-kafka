import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICES } from './config/kafka.config';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(KAFKA_SERVICES.HELLO) private readonly kafka: ClientKafka) {
  }

  async onModuleInit() {
    ['hello', 'error', 'skip', 'reply'].forEach((key) =>
      this.kafka.subscribeToResponseOf(`say.${key}`),
    );
  }

  async onModuleDestroy() {
    await this.kafka.close();
  }

  @Get()
  async sayHello() {
    const result = await lastValueFrom(
      this.kafka.send('say.hello', { value: 'Additional data 5' }),
    );
    console.log('producer fire', result);
    return result;
  }
}
