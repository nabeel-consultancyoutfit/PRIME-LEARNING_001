import {
  IsString, IsOptional, IsArray, IsBoolean,
  IsNumber, IsDateString, IsMongoId, Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsMongoId()
  learnerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  trainerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  programmeId?: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty()
  @IsString()
  primaryMethod: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  secondaryMethods?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  assessmentCriteria?: any[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  skillTags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  associatedResources?: any[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateSet?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateDue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isTrainerAssigned?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  otjHours?: number;
}
