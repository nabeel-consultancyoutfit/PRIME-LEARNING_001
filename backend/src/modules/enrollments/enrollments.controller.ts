import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Enrollments')
@ApiBearerAuth()
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('my')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my course enrollments' })
  getMyEnrollments(@CurrentUser() user: any, @Query() pagination: PaginationDto) {
    return this.enrollmentsService.getMyEnrollments(user._id, pagination);
  }

  @Post()
  @Roles('learner')
  @ApiOperation({ summary: 'Enroll in a course' })
  enroll(@CurrentUser() user: any, @Body() body: { courseId: string }) {
    return this.enrollmentsService.enroll(user._id, body.courseId);
  }

  @Get('my/:courseId')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my enrollment for a specific course' })
  getMyEnrollment(@CurrentUser() user: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.getEnrollment(user._id, courseId);
  }

  @Patch(':enrollmentId/lesson/:lessonId')
  @Roles('learner')
  @ApiOperation({ summary: 'Mark a lesson as complete' })
  completeLesson(
    @Param('enrollmentId') enrollmentId: string,
    @Param('lessonId') lessonId: string,
    @Body() body: { timeSpent: number },
  ) {
    return this.enrollmentsService.updateLessonProgress(enrollmentId, lessonId, body.timeSpent || 0);
  }

  @Get('course/:courseId')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Get all enrollments for a course' })
  byCourse(@Param('courseId') courseId: string, @Query() pagination: PaginationDto) {
    return this.enrollmentsService.findByCourse(courseId, pagination);
  }
}
