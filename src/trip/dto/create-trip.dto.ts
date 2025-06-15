// src/trip/dto/create-trip.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 1, description: 'Bus ID to assign the trip to' })
  @IsNotEmpty()
  @IsNumber()
  busId: number;

  @ApiProperty({ example: 3, description: 'Route ID the bus will follow' })
  @IsNotEmpty()
  @IsNumber()
  routeId: number;

  @ApiProperty({ example: '2025-06-14T07:00:00Z', description: 'Start time of the trip' })
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: 2, description: 'Available wheelchair slots', required: false })
  @IsNumber()
  availableWheelchairSlots?: number;
}
