import { KafkaErrorType } from './kafka.exception.type';

export const isKafkaError = (error: KafkaErrorType) => error.status === 'error';
