import { ClientKafka } from '@nestjs/microservices';
import { EventType, makeEvent } from '@app/events';
import { lastValueFrom } from 'rxjs';
import { KafkaErrorType, KafkaException } from '@app/kafka-errors';

const communicate = async <Result>(
  methodType: 'send' | 'emit',
  kafka: ClientKafka,
  event: EventType,
  value: any = {},
): Promise<Result> => {
  const result = await lastValueFrom<Result | KafkaErrorType>(
    kafka[methodType]<Result | KafkaErrorType, { value }>(makeEvent(event), {
      value,
    }),
  );
  if ('status' in result) {
    throw new KafkaException(result);
  }
  return result;
};

export const send = async <Result>(
  kafka: ClientKafka,
  event: EventType,
  value: any = {},
): Promise<Result> => communicate('send', kafka, event, value);

export const emit = async <Result>(
  kafka: ClientKafka,
  event: EventType,
  value: any = {},
): Promise<Result> => communicate('emit', kafka, event, value);
