import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const kafkaConfig = (configService: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: configService.get<string[]>('config.kafka.brokers'),
    },
    consumer: {
      groupId: configService.get<string>('config.kafka.groupId'),
    },
  },
})