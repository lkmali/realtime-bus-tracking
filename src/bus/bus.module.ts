// src/bus/bus.module.ts
import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { CommonModule } from '../common/common.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Bus} from './entities/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
