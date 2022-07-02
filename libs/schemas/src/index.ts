import { FAKE_GENERATE_EVENT } from '@app/events';
import { RawAvroSchema } from '@kafkajs/confluent-schema-registry/dist/@types';

export const FAKE_GENERATOR_SCHEMA: RawAvroSchema = {
  type: 'record',
  name: FAKE_GENERATE_EVENT.name,
  namespace: FAKE_GENERATE_EVENT.namespace,
  fields: [{ type: 'string', name: 'generatorType' }],
};
