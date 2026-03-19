import {
  Controller, Get, Post, Patch, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // ── Learner endpoints ──────────────────────────────────────────────────
  @Get('my')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my tasks (learner)' })
  @ApiQuery({ name: 'status', required: false })
  getMyTasks(
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
    @Query('status') status?: string,
  ) {
    return this.tasksService.getMyTasks(user._id, pagination, status);
  }

  @Post(':id/submit')
  @Roles('learner')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit task for review' })
  submit(@Param('id') id: string, @CurrentUser() user: any) {
    return this.tasksService.submitForReview(id, user._id);
  }

  // ── Trainer endpoints ──────────────────────────────────────────────────
  @Get('trainer')
  @Roles('trainer', 'iqa')
  @ApiOperation({ summary: 'Get tasks for my learners (trainer)' })
  getTrainerTasks(
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
    @Query('status') status?: string,
  ) {
    return this.tasksService.getTasksForTrainer(user._id, pagination, status);
  }

  @Post(':id/approve')
  @Roles('trainer', 'iqa', 'admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve a task' })
  approve(@Param('id') id: string, @CurrentUser() user: any) {
    return this.tasksService.approve(id, user._id);
  }

  @Post(':id/reject')
  @Roles('trainer', 'iqa', 'admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject a task' })
  reject(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { reason: string },
  ) {
    return this.tasksService.reject(id, user._id, body.reason);
  }

  // ── Shared endpoints ───────────────────────────────────────────────────
  @Get()
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'List all tasks (admin/trainer)' })
  @ApiQuery({ name: 'learnerId', required: false })
  @ApiQuery({ name: 'trainerId', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(
    @Query() pagination: PaginationDto,
    @Query('learnerId') learnerId?: string,
    @Query('trainerId') trainerId?: string,
    @Query('status') status?: string,
  ) {
    return this.tasksService.findAll(pagination, { learnerId, trainerId, status });
  }

  @Post()
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Create a task' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  findById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @CurrentUser() user: any) {
    return this.tasksService.update(id, dto, user);
  }
}
