import {
  Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';

@ApiTags('Routes')
@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new route with stops' })
  @ApiResponse({ status: 201, description: 'The route has been successfully created.' })
  create(@Body() dto: CreateRouteDto): Promise<Route> {
    return this.routeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all routes with stops' })
  @ApiResponse({ status: 200, description: 'Return all routes.' })
  findAll(): Promise<Route[]> {
    return this.routeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get route by ID' })
  @ApiResponse({ status: 200, description: 'Return the route.' })
  findOne(@Param('id') id: string): Promise<Route> {
    return this.routeService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update route by ID' })
  @ApiResponse({ status: 200, description: 'The route has been successfully updated.' })
  update(@Param('id') id: string, @Body() dto: UpdateRouteDto): Promise<Route> {
    return this.routeService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete route by ID' })
  @ApiResponse({ status: 204, description: 'The route has been successfully deleted.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.routeService.remove(+id);
  }
}
