import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TrainersService } from './trainers.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Trainers')
@ApiBearerAuth()
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get('me')
  @Roles('trainer')
  @ApiOperation({ summary: 'Get my trainer profile' })
  getMyProfile(@CurrentUser() user: any) {
    return this.trainersService.getMyProfile(user._id);
  }

  @Get('me/learners')
  @Roles('trainer')
  @ApiOperation({ summary: 'Get my assigned learners' })
  getMyLearners(@CurrentUser() user: any, @Query() pagination: PaginationDto) {
    return this.trainersService.getMyLearners(user._id, pagination);
  }

  @Get()
  @Roles('admin', 'iqa')
  @ApiOperation({ summary: 'List all trainers' })
  findAll(@Query() pagination: PaginationDto) {
    return this.trainersService.findAll(pagination);
  }

  @Get(':id')
  @Roles('admin', 'iqa')
  @ApiOperation({ summary: 'Get trainer by ID' })
  findById(@Param('id') id: string) {
    return this.trainersService.findById(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update trainer profile (admin)' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.trainersService.update(id, body);
  }
}
