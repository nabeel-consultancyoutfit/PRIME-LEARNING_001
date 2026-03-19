import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LearnersService } from './learners.service';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Learners')
@ApiBearerAuth()
@Controller('learners')
export class LearnersController {
  constructor(private readonly learnersService: LearnersService) {}

  @Get('me')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my learner profile' })
  getMyProfile(@CurrentUser() user: any) {
    return this.learnersService.getMyProfile(user._id);
  }

  @Get()
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'List learners' })
  findAll(@Query() pagination: PaginationDto, @Query('trainerId') trainerId?: string) {
    return this.learnersService.findAll(pagination, trainerId);
  }

  @Post()
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Create learner profile' })
  create(@Body() dto: CreateLearnerDto) {
    return this.learnersService.create(dto);
  }

  @Get(':id')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Get learner by ID' })
  findById(@Param('id') id: string) {
    return this.learnersService.findById(id);
  }

  @Patch(':id')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Update learner profile' })
  update(@Param('id') id: string, @Body() dto: UpdateLearnerDto, @CurrentUser() user: any) {
    return this.learnersService.update(id, dto, user);
  }
}
