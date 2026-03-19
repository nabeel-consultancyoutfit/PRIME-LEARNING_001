import { IsString, IsOptional, IsIn, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  @IsMongoId()
  conversationId: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional({ enum: ['text', 'file', 'image'] })
  @IsOptional()
  @IsIn(['text', 'file', 'image'])
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileUrl?: string;
}
