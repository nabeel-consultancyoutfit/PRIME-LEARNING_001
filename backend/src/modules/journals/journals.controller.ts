import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JournalsService } from './journals.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Journals')
@ApiBearerAuth()
@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Get('my')
  @Roles('learner')
  @ApiOperation({ summary: 'Get my learning journals' })
  @ApiQuery({ name: 'status', required: false })
  getMyJournals(
    @CurrentUser() user: any,
    @Query() pagination: PaginationDto,
    @Query('status') status?: string,
  ) {
    return this.journalsService.getMyJournals(user._id, pagination, status);
  }

  @Post()
  @Roles('learner')
  @ApiOperation({ summary: 'Create journal entry' })
  create(@Body() dto: CreateJournalDto, @CurrentUser() user: any) {
    return this.journalsService.create(dto, user._id);
  }

  @Get()
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'List journals' })
  @ApiQuery({ name: 'learnerId', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(
    @Query() pagination: PaginationDto,
    @Query('learnerId') learnerId?: string,
    @Query('status') status?: string,
  ) {
    return this.journalsService.findAll(pagination, learnerId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get journal by ID' })
  findById(@Param('id') id: string) {
    return this.journalsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update journal entry' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateJournalDto>, @CurrentUser() user: any) {
    return this.journalsService.update(id, dto, user._id, user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete journal entry' })
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.journalsService.delete(id, user._id, user.role);
  }
}
