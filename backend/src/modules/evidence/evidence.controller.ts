import {
  Controller, Get, Post, Patch, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Evidence')
@ApiBearerAuth()
@Controller('evidence')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Get('my')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my evidence' })
  getMyEvidence(
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
    @Query('status') status?: string,
  ) {
    return this.evidenceService.getMyEvidence(user._id, pagination, status);
  }

  @Post()
  @Roles('learner')
  @ApiOperation({ summary: 'Create evidence' })
  create(@Body() dto: CreateEvidenceDto, @CurrentUser() user: any) {
    return this.evidenceService.create(dto, user._id);
  }

  @Post(':id/submit')
  @Roles('learner')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit evidence for review' })
  submit(@Param('id') id: string, @CurrentUser() user: any) {
    return this.evidenceService.submit(id, user._id);
  }

  @Post(':id/review')
  @Roles('trainer', 'iqa', 'admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Review evidence (approve/reject)' })
  review(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { approved: boolean; notes?: string },
  ) {
    return this.evidenceService.review(id, user._id, body.approved, body.notes);
  }

  @Get()
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'List all evidence' })
  @ApiQuery({ name: 'learnerId', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(
    @Query() pagination: PaginationDto,
    @Query('learnerId') learnerId?: string,
    @Query('status') status?: string,
  ) {
    return this.evidenceService.findAll(pagination, learnerId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get evidence by ID' })
  findById(@Param('id') id: string) {
    return this.evidenceService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update evidence' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateEvidenceDto>, @CurrentUser() user: any) {
    return this.evidenceService.update(id, dto, user._id, user.role);
  }
}
