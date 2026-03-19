import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Courses')
@ApiBearerAuth()
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'List available courses' })
  @ApiQuery({ name: 'programmeId', required: false })
  findAll(@Query() pagination: PaginationDto, @Query('programmeId') programmeId?: string) {
    return this.coursesService.findAll(pagination, programmeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course details' })
  findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Post()
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Create a course' })
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.coursesService.create(body, user._id);
  }

  @Patch(':id')
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Update a course' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.coursesService.update(id, body);
  }

  @Post(':id/lessons')
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Add a lesson to a course' })
  addLesson(@Param('id') id: string, @Body() lesson: any) {
    return this.coursesService.addLesson(id, lesson);
  }

  @Patch(':id/lessons/:lessonId')
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Update a lesson' })
  updateLesson(@Param('id') id: string, @Param('lessonId') lessonId: string, @Body() body: any) {
    return this.coursesService.updateLesson(id, lessonId, body);
  }
}
