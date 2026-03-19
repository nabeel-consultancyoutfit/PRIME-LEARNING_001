import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgrammeDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apprenticeshipStandard?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  level?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  ksbs?: any[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  otjHoursRequired?: number;
}
