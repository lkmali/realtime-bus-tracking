// src/bus/bus.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Bus')
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new bus' })
  create(@Body() dto: CreateBusDto) {
    return this.busService.createBus(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all registered buses' })
  findAll() {
    return this.busService.getAllBus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific bus by ID' })
  findOne(@Param('id') id: number) {
    return this.busService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bus by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateBusDto) {
    return this.busService.updateBus(id, dto);
  }
}
