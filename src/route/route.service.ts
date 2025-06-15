import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Stop } from './entities/stop.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route) private routeRepo: Repository<Route>,
    @InjectRepository(Stop) private stopRepo: Repository<Stop>,
  ) {}

  async create(dto: CreateRouteDto): Promise<Route> {
    const route = this.routeRepo.create({ name: dto.name });
    const savedRoute = await this.routeRepo.save(route);

    const stops = dto.stops.map(stop =>
      this.stopRepo.create({ ...stop, route: savedRoute }),
    );

    await this.stopRepo.save(stops);
    return this.findOne(savedRoute.id);
  }

  findAll(): Promise<Route[]> {
    return this.routeRepo.find({ relations: ['stops'] });
  }

  findOne(id: number): Promise<Route> {
    return this.routeRepo.findOne({
      where: { id },
      relations: ['stops'],
      order: { stops: { order: 'ASC' } },
    });
  }

  async update(id: number, dto: UpdateRouteDto): Promise<Route> {
    const route = await this.routeRepo.findOne({ where: { id } });
    if (!route) throw new Error('Route not found');
    await this.routeRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.routeRepo.delete(id);
  }
}
