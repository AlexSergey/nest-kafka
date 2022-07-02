import { Deserializer, IncomingEvent } from '@nestjs/microservices';
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';
import { Message } from 'kafkajs';
import { RawAvroSchema } from '@kafkajs/confluent-schema-registry/dist/@types';
import { makeEvent } from '@app/events';

export const createDeserializer = (
  registry: SchemaRegistry,
  schemas: RawAvroSchema[],
) => {
  return class CustomDeserializer implements Deserializer {
    async deserialize(
      message: Message,
      options?: Record<string, any>,
    ): Promise<IncomingEvent> {
      if (!options) {
        console.warn('Topic is empty');
        return {
          pattern: undefined,
          data: undefined,
        };
      }
      const schema = schemas.find(
        ({ name, namespace }) =>
          options.channel ===
          makeEvent({
            name,
            namespace,
          }),
      );
      if (!schema) {
        console.warn('Schema not found');
        return {
          pattern: undefined,
          data: undefined,
        };
      }
      const { value } = message;
      console.log('val', value);
      const foundId = await registry.getRegistryIdBySchema(
        options.channel,
        schema,
      );
      let id = foundId;
      if (!foundId) {
        try {
          const registered = await registry.register({
            type: SchemaType.AVRO,
            schema: JSON.stringify(schema),
          });
          id = registered.id;
        } catch (e) {
          console.warn("Schema can't be register");
          console.log(e.message);
        }
      }
      if (!id) {
        return {
          pattern: undefined,
          data: undefined,
        };
      }
      try {
        return {
          pattern: options.channel,
          data: await registry.decode(value as Buffer),
        };
      } catch (e) {
        console.error("Can't decode value");
        console.log(e.message);
      }
    }
  };
};
