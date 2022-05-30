import { Controller } from '@nestjs/common';
import { Message } from 'kafkajs';
import * as fs from 'fs';
import isPng from 'is-png';
import { EventPattern, MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('say.hello')
  getHello(@Payload() message: Message, @Ctx() context: KafkaContext): string {
    const val = message.value.toString();
    console.log(val);
    if (typeof val === 'string') {
      return this.appService.getHello(val);
    }
  }

  @EventPattern('picture')
  getPicture(@Payload() message: Message): void {
    fs.writeFile('test.png', message.value, (err) => {

    })
  }
}
