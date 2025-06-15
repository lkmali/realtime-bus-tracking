// src/bus/bus.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { Bus } from './entities/bus.entity';
import { IGenericRepository } from '../common/interfaces/repository.interface';
import {UpdateBusDto} from './dto/update-bus.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, UpdateResult} from 'typeorm';

@Injectable()
export class BusService {
  constructor(
        @InjectRepository(Bus) private busRepository: Repository<Bus>,
  ) {}

  async createBus(dto: CreateBusDto): Promise<Bus> {
    const bus =  this.busRepository.create(dto);
    await this.busRepository.save(bus);
    return bus
  }

  async getAllBus(): Promise<Bus[]> {
    const bus = await this.busRepository.find();
    return bus
  }

  async findOne(id: number): Promise<Bus> {
    const bus = await this.busRepository.findOne({ where: { id } });
    return bus
  }

  async updateBus(id: number, dto: UpdateBusDto): Promise<UpdateResult> {
    const bus = await this.busRepository.update(id, dto);
    return bus
  }
}
