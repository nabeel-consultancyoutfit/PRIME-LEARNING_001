import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsString, IsIn, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({ enum: ['In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'] })
  @IsOptional()
  @IsIn(['In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  evidence?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  feedbackComments?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  declaration?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateCompleted?: string;
}
