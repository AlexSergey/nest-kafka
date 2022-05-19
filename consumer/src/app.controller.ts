import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { AppService } from './app.service';

type Value = {
  data: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('say.hello')
  getHello(@Payload() message: any, @Ctx() context: KafkaContext): string {
    const originalMessage = context.getMessage();
    const val: Value = originalMessage.value as unknown as Value;
    console.log(val.data);
    return this.appService.getHello();
  }
}
