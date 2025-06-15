import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { Route } from './entities/route.entity';
import { Stop } from './entities/stop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, Stop])],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
