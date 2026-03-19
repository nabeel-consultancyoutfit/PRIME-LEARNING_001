import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'System-wide statistics' })
  getStats() {
    return this.adminService.getSystemStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'List all users with search and role filter' })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'search', required: false })
  listUsers(
    @Query() pagination: PaginationDto,
    @Query('role') role?: string,
    @Query('search') search?: string,
  ) {
    return this.adminService.listUsers(pagination, role, search);
  }

  @Patch('users/:id/toggle-active')
  @ApiOperation({ summary: 'Toggle user active status' })
  toggleUserActive(@Param('id') id: string) {
    return this.adminService.toggleUserActive(id);
  }

  @Post('assign-trainer')
  @ApiOperation({ summary: 'Bulk assign trainer to learners' })
  bulkAssignTrainer(@Body() body: { learnerIds: string[]; trainerId: string }) {
    return this.adminService.bulkAssignTrainer(body.learnerIds, body.trainerId);
  }

  @Post('assign-programme')
  @ApiOperation({ summary: 'Bulk assign programme to learners' })
  bulkAssignProgramme(@Body() body: { learnerIds: string[]; programmeId: string }) {
    return this.adminService.bulkAssignProgramme(body.learnerIds, body.programmeId);
  }
}
