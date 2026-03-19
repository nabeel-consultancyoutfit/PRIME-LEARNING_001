import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Progress')
@ApiBearerAuth()
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('me')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my progress' })
  getMyProgress(@CurrentUser() user: any) {
    return this.progressService.getMyProgress(user._id);
  }

  @Get()
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'List all learner progress records' })
  findAll(@Query() pagination: PaginationDto) {
    return this.progressService.findAll(pagination);
  }

  @Get(':learnerId')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Get progress for specific learner' })
  getByLearner(@Param('learnerId') learnerId: string) {
    return this.progressService.getProgressByLearnerId(learnerId);
  }

  @Patch(':learnerId')
  @Roles('admin', 'trainer')
  @ApiOperation({ summary: 'Update learner progress' })
  update(@Param('learnerId') learnerId: string, @Body() body: any) {
    return this.progressService.updateProgress(learnerId, body);
  }

  @Patch(':learnerId/ksb/:ksbCode')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Mark a KSB as complete' })
  markKSB(@Param('learnerId') learnerId: string, @Param('ksbCode') ksbCode: string) {
    return this.progressService.markKSBComplete(learnerId, ksbCode);
  }
}
