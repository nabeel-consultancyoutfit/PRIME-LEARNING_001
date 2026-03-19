import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/interfaces/jwt-payload.interface';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Secret123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: ['learner', 'trainer', 'iqa', 'admin'] })
  @IsIn(['learner', 'trainer', 'iqa', 'admin'])
  role: UserRole;
}
