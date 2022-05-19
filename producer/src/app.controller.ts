import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('HERO_SERVICE') private readonly kafka: ClientKafka) {
  }

  async onModuleInit() {
    ['hello', 'error', 'skip'].forEach((key) =>
      this.kafka.subscribeToResponseOf(`say.${key}`),
    );
  }

  async onModuleDestroy() {
    await this.kafka.close();
  }

  @Get()
  sayHello() {
    return this.kafka.send('say.hello', { data: 'Additional data' });
  }
}
