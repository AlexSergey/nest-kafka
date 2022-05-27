import { Controller } from '@nestjs/common';
import { Message } from 'kafkajs';
import { EventPattern, MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { AppService } from './app.service';

type Value = {
  data: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('say.hello')
  getHello(@Payload() message: Message, @Ctx() context: KafkaContext): string {
    console.log(message);
    if (typeof message.value === 'string') {
      return this.appService.getHello(message.value);
    }
  }
}
