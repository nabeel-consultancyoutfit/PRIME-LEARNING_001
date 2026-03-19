import { PartialType } from '@nestjs/swagger';
import { CreateLearnerDto } from './create-learner.dto';
import { IsOptional, IsIn, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLearnerDto extends PartialType(CreateLearnerDto) {
  @ApiPropertyOptional({ enum: ['active', 'on_break', 'withdrawn', 'completed'] })
  @IsOptional()
  @IsIn(['active', 'on_break', 'withdrawn', 'completed'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  overallProgress?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  otjHoursLogged?: number;
}
