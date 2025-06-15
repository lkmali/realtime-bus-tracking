// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { createGenericRepositoryProvider } from './providers/generic-repository.provider';
import { Bus } from '../bus/entities/bus.entity';
import { Route } from '../route/entities/route.entity';
import { Trip } from '../trip/entities/trip.entity';
import {Stop} from '../route/entities/stop.entity';

@Module({
  providers: [
    createGenericRepositoryProvider(Bus),
    createGenericRepositoryProvider(Route),
    createGenericRepositoryProvider(Trip),
    createGenericRepositoryProvider(Stop),
  ],
  exports: [
    `GENERIC_REPO_BUS`,
    `GENERIC_REPO_ROUTE`,
    `GENERIC_REPO_TRIP`,
    'GENERIC_REPO_STOP',
  ],
})
export class CommonModule {}
