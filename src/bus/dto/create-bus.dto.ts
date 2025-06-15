// src/bus/dto/create-bus.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBusDto {
  @ApiProperty({ example: 'MH12AB1234' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  wheelchairCapacity?: number;
}
