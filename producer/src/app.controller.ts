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
    return result;
  }

  @Get('/picture')
  async sendPicture() {
    const picture =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO 9TXL0Y4OHwAAAABJRU5ErkJggg==';
    const buffer = Buffer.from(
      picture.replace(/^data:image\/png;base64,/, ''),
      'base64',
    );
    this.kafka.emit('picture', { value: buffer });
    return 'ok';
  }
}
