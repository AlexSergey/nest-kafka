import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppService } from './app.service';
import { KAFKA } from './app.constants';
import { ClientKafka } from '@nestjs/microservices';
import { bindEvent, FAKE_GENERATE_EVENT } from '@app/events';
import { GeneratedUser } from '@app/contracts';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { send } from '@app/kafka-communicator';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;
  constructor(
    @Inject(KAFKA)
    private readonly kafka: ClientKafka,
    private readonly appService: AppService,
  ) {}

  async onModuleInit() {
    bindEvent(FAKE_GENERATE_EVENT, (events) => {
      events.forEach((event) => {
        this.kafka.subscribeToResponseOf(event);
      });
    });
    this.producer = await this.kafka.connect();
  }

  async onModuleDestroy() {
    await this.kafka.close();
  }

  @Get('/generate')
  async generateUser(): Promise<{ data: GeneratedUser } | void> {
    try {
      const res = await send<GeneratedUser>(
        this.kafka,
        FAKE_GENERATE_EVENT,
        this.appService.getGeneratorType(),
      );
      return { data: res };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
