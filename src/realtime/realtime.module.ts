import { Module } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import {RedisModule} from '../redis/redis.module';
import {LocationService} from './location.service';

@Module({
  controllers: [],
  imports: [RedisModule],
  providers: [RealtimeService,LocationService],
})
export class RealtimeModule {}