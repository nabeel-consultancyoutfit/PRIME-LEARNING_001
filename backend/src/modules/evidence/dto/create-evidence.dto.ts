import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEvidenceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  taskId?: string;

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
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  attachments?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  ksbTags?: string[];
}
