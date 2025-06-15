// src/trip/trip.module.ts
import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
