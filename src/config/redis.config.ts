import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from 'nestjs-redis';

export const redisConfig = (configService: ConfigService): RedisModuleOptions => ({
  host: configService.get('config.redis.host'),
  port: configService.get('config.redis.port'),
});