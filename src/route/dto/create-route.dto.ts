import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class StopDTO {
  @ApiProperty({ example: 'Main Street' })
  @IsString()
  name: string;

  @ApiProperty({ example: 19.076 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 72.8777 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;
}

export class CreateRouteDto {
  @ApiProperty({ example: 'Route 101' })
  @IsString()
  name: string;

  @ApiProperty({ type: [StopDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StopDTO)
  stops: StopDTO[];
}
