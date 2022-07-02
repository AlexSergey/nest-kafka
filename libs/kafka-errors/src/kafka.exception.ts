import { RpcException } from '@nestjs/microservices';
import { KafkaExceptionType } from '@app/kafka-errors/kafka.exception.type';

export class KafkaException extends RpcException {
  private readonly status: 'error' = 'error';
  private readonly code: number;

  constructor(params: KafkaExceptionType) {
    super(params);
    this.code = params.code;
  }

  toString(): string {
    return JSON.stringify({
      stack: this.stack,
      code: this.code,
      message: this.message,
      status: this.status,
    });
  }
}

export class KafkaCommonException extends KafkaException {
  constructor(params: Omit<KafkaExceptionType, 'code'> | string) {
    super({
      code: 0,
      message: typeof params === 'string' ? params : params.message,
    });
  }
}
