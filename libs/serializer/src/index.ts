import { Serializer } from '@nestjs/microservices';
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';
import { Message } from 'kafkajs';
import { RawAvroSchema } from '@kafkajs/confluent-schema-registry/dist/@types';
import { makeEvent } from '@app/events';

export const createSerializer = (
  registry: SchemaRegistry,
  schemas: RawAvroSchema[],
) => {
  return class CustomSerializer implements Serializer {
    async serialize(
      message: Message,
      options?: Record<string, any>,
    ): Promise<Message> {
      if (!options) {
        console.warn('Topic is empty');
        return {
          key: undefined,
          value: null,
          headers: {},
        };
      }
      const schema = schemas.find(
        ({ name, namespace }) =>
          options.pattern ===
          makeEvent({
            name,
            namespace,
          }),
      );
      if (!schema) {
        console.warn('Schema not found');
        return {
          key: undefined,
          value: null,
          headers: {},
        };
      }
      const { value } = message;
      let id;
      try {
        id = await registry.getRegistryIdBySchema(options.pattern, schema);
      } catch (e) {
        console.warn('Schema not found in schema-registry. Will be registered');
      }
      if (!id) {
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
          key: undefined,
          value: null,
          headers: {},
        };
      }
      try {
        return {
          ...{
            key: typeof message.key !== 'undefined' ? message.key : undefined,
          },
          ...{
            headers:
              typeof message.headers !== 'undefined' ? message.headers : {},
          },
          ...message,
          value: await registry.encode(id, value as Buffer),
        };
      } catch (e) {
        console.error("Can't encode value");
        console.log(e.message);
      }
    }
  };
};
