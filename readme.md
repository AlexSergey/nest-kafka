# Nestjs + Kafkajs integration

This is test project to connect nestjs and kafkajs.
Includes docker-compose with:
- zookeeper
- kafka cluster
- kafka-ui
- kafdrop

## Installation
Go to "consumer" folder and run:

```shell
npm install
```

Go to "producer" folder and run:

```shell
npm install
```

In the root project's folder run:

```shell
docker-compose up
```

### Usage

After running docker containers you should run producer and consumer.
Please, use the following command:

```shell
npm start
```
Producer will be available on the link:
[producer link](http://localhost:3000)
After opening it in the Browser producer will fire event to consumer

### Console usage

Console usage snippets:

- Consumer

```shell
kafka-console-consumer \
--topic "say.hello" \
--bootstrap-server localhost:9092
```

- Producer

```shell
kafka-console-producer \
--topic "say.hello" \
--bootstrap-server localhost:9092
```

To use key:value notation:

```shell
kafka-console-producer \
--topic "say.hello" \
--bootstrap-server localhost:9092 \
--property parse.key=true \
--property key.separator=":"
```
