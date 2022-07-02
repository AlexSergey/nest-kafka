import { Controller, Get } from '@nestjs/common';
import { FakeServiceService } from './fake-data.service';
import {
  Ctx,
  MessagePattern,
  KafkaContext,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { FAKE_GENERATE_EVENT, makeEvent } from '@app/events';
import { GeneratedUser, GeneratorType } from '@app/contracts';
import { KafkaException } from '@app/kafka-errors';

@Controller()
export class FakeServiceController {
  constructor(private readonly fakeServiceService: FakeServiceService) {}

  @MessagePattern(makeEvent(FAKE_GENERATE_EVENT))
  async getFakeUser(
    @Payload() message: GeneratorType,
    @Ctx() context: KafkaContext,
  ): Promise<GeneratedUser | RpcException> {
    return new KafkaException({
      code: 1710,
      message: 'The object universal unique identifier (UUID) was not found2',
    });
    const data = await this.fakeServiceService.generateByType(
      message.generatorType,
    );
    const additionalData = await this.fakeServiceService.getAdditionalData(
      message.generatorType,
    );
    return { ...data, ...additionalData };
  }
}
