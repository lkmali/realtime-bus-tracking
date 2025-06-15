// src/trip/trip.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IGenericRepository } from '../common/interfaces/repository.interface';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripService {
  constructor(
    @Inject('GENERIC_REPO_TRIP')
    private readonly tripRepository: IGenericRepository<Trip>,
  ) {}

  async createTrip(dto: CreateTripDto): Promise<Trip> {
    const trip = await this.tripRepository.create(dto);
    return trip
  }

  async findAll(): Promise<Trip[]> {
    return await this.tripRepository.findAll({ relations: ['bus', 'route'] });
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findOne({ where: { id }, relations: ['bus', 'route'] });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: number, dto: UpdateTripDto): Promise<Trip> {
    const trip = await this.findOne(id);
    Object.assign(trip, dto);
    return await this.tripRepository.create(trip);
  }

  async remove(id: number): Promise<void> {
    await this.tripRepository.delete(id);
  }
}
