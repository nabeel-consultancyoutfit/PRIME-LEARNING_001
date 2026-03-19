import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  // ── Core identity ──────────────────────────────────────────────────────────
  @ApiPropertyOptional() @IsOptional() @IsString()
  firstName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  lastName?: string;

  @ApiPropertyOptional() @IsOptional() @IsEmail()
  email?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  avatar?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isActive?: boolean;

  // ── Contact details ────────────────────────────────────────────────────────
  @ApiPropertyOptional() @IsOptional() @IsString()
  phone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  landline?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  mobile?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  skype?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  website?: string;

  // ── Personal details ───────────────────────────────────────────────────────
  @ApiPropertyOptional() @IsOptional() @IsString()
  pronouns?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  bio?: string;

  // ── Address ────────────────────────────────────────────────────────────────
  @ApiPropertyOptional() @IsOptional() @IsString()
  address?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  homeAddress?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  workAddress?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  workplace?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  timezone?: string;

  // ── Equality, LLDD & Health ────────────────────────────────────────────────
  @ApiPropertyOptional() @IsOptional() @IsString()
  ethnicity?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  sex?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  llddStatus?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  primaryLldd?: string;
}
