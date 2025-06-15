// src/search/search.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('route')
  @ApiOperation({ summary: 'Search available routes and live buses by start and end stop' })
  @ApiQuery({ name: 'startStop', required: true, example: 'Pune Station' })
  @ApiQuery({ name: 'endStop', required: true, example: 'Shivaji Nagar' })
  async searchBusesByStops(
    @Query('startStop') startStop: string,
    @Query('endStop') endStop: string,
  ) {
    return this.searchService.findAvailableBusesBetweenStops(startStop, endStop);
  }
}
