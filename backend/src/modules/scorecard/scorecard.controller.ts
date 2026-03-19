import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ScorecardService } from './scorecard.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Scorecard')
@ApiBearerAuth()
@Controller('scorecard')
export class ScorecardController {
  constructor(private readonly scorecardService: ScorecardService) {}

  @Get('me')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my scorecard' })
  getMyScorecard(@CurrentUser() user: any) {
    return this.scorecardService.getMyScorecard(user._id);
  }

  @Patch('me/self-assessment')
  @Roles('learner')
  @ApiOperation({ summary: 'Update self assessment' })
  updateSelfAssessment(@CurrentUser() user: any, @Body() body: { entries: any[] }) {
    return this.scorecardService.updateSelfAssessment(user._id, body.entries);
  }

  @Get()
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'List all scorecards' })
  findAll(@Query() pagination: PaginationDto) {
    return this.scorecardService.findAll(pagination);
  }

  @Get(':learnerId')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Get scorecard for specific learner' })
  getByLearner(@Param('learnerId') learnerId: string) {
    return this.scorecardService.getBylearnerId(learnerId);
  }

  @Patch(':learnerId/entry/:ksbCode')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Update a KSB entry in scorecard' })
  updateEntry(
    @Param('learnerId') learnerId: string,
    @Param('ksbCode') ksbCode: string,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    return this.scorecardService.updateEntry(learnerId, ksbCode, body, user._id);
  }
}
