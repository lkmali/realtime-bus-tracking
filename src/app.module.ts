import { BusModule } from './bus/bus.module';
import { RouteModule } from './route/route.module';
import { TripModule } from './trip/trip.module';
import { SearchModule } from './search/search.module';
import { RealtimeModule } from './realtime/realtime.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import {CommonModule} from './common/common.module';
import {postgresConfig} from './config/postgres.config';
import {kafkaConfig} from './config/kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (postgresConfig(configService)),
      inject: [ConfigService],
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => (kafkaConfig(configService)),
    //     inject: [ConfigService],
    //   },
    // ]),
    BusModule,
    RouteModule,
    TripModule,
    SearchModule,
    RealtimeModule,
    CommonModule
  ]
})
export class AppModule {}