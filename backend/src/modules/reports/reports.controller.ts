import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('learner/:learnerId')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Full report for a learner' })
  getLearnerReport(@Param('learnerId') learnerId: string) {
    return this.reportsService.getLearnerReport(learnerId);
  }

  @Get('cohort')
  @Roles('trainer', 'iqa', 'admin')
  @ApiOperation({ summary: 'Cohort report for trainer\'s learners' })
  getCohortReport(@CurrentUser() user: any) {
    return this.reportsService.getCohortReport(user._id);
  }

  @Get('otj')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'OTJ hours report' })
  getOTJReport(@Query('learnerId') learnerId?: string) {
    return this.reportsService.getOTJReport(learnerId);
  }
}
