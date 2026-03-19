import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('learner')
  @Roles('learner')
  @ApiOperation({ summary: 'Learner dashboard stats' })
  getLearnerDashboard(@CurrentUser() user: any) {
    return this.dashboardService.getLearnerDashboard(user._id);
  }

  @Get('trainer')
  @Roles('trainer', 'iqa')
  @ApiOperation({ summary: 'Trainer dashboard stats' })
  getTrainerDashboard(@CurrentUser() user: any) {
    return this.dashboardService.getTrainerDashboard(user._id);
  }

  @Get('admin')
  @Roles('admin')
  @ApiOperation({ summary: 'Admin dashboard stats' })
  getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }
}
