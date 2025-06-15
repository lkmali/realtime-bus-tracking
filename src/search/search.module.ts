import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import {CommonModule} from 'src/common/common.module';
import {RedisModule} from '../redis/redis.module'; 

@Module({
  controllers: [SearchController],
  providers: [SearchService],
imports: [RedisModule,CommonModule]
})
export class SearchModule {}