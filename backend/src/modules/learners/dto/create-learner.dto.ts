import { IsString, IsOptional, IsDateString, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLearnerDto {
  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  trainerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  programmeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apprenticeshipStandard?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cohort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expectedEndDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  employer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  otjHoursTarget?: number;
}
