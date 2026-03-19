import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProgrammesService } from './programmes.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Programmes')
@ApiBearerAuth()
@Controller('programmes')
export class ProgrammesController {
  constructor(private readonly programmesService: ProgrammesService) {}

  @Get()
  @ApiOperation({ summary: 'List all programmes' })
  findAll(@Query() pagination: PaginationDto) {
    return this.programmesService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get programme by ID' })
  findById(@Param('id') id: string) {
    return this.programmesService.findById(id);
  }

  @Post()
  @Roles('admin', 'iqa')
  @ApiOperation({ summary: 'Create programme' })
  create(@Body() dto: CreateProgrammeDto, @CurrentUser() user: any) {
    return this.programmesService.create(dto, user._id);
  }

  @Patch(':id')
  @Roles('admin', 'iqa')
  @ApiOperation({ summary: 'Update programme' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateProgrammeDto>) {
    return this.programmesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Archive programme' })
  archive(@Param('id') id: string) {
    return this.programmesService.archive(id);
  }
}
