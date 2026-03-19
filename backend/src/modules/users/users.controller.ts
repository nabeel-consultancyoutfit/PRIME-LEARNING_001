import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

// ── Multer helpers ────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function makeStorage(subDir: string) {
  return diskStorage({
    destination: (_req, _file, cb) => {
      const dir = join(process.cwd(), 'uploads', subDir);
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  });
}

const ALLOWED_IMAGE_TYPES = /jpeg|jpg|png|gif|webp/;
const ALLOWED_DOC_TYPES = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;

function imageFileFilter(_req: any, file: any, cb: any) {
  const ext = extname(file.originalname).toLowerCase().replace('.', '');
  if (ALLOWED_IMAGE_TYPES.test(ext)) cb(null, true);
  else cb(new BadRequestException('Only image files are allowed'), false);
}

function docFileFilter(_req: any, file: any, cb: any) {
  const ext = extname(file.originalname).toLowerCase().replace('.', '');
  if (ALLOWED_DOC_TYPES.test(ext)) cb(null, true);
  else cb(new BadRequestException('Unsupported file type'), false);
}

// ── Controller ────────────────────────────────────────────────────────────────

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ── Me routes ─────────────────────────────────────────────────────────────

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser() user: any) {
    return this.usersService.getMe(user._id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateMe(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateMe(user._id, dto);
  }

  // ── Avatar upload ─────────────────────────────────────────────────────────

  @Post('me/avatar')
  @ApiOperation({ summary: 'Upload profile avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', {
    storage: makeStorage('avatars'),
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  }))
  async uploadAvatar(
    @CurrentUser() user: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    const url = `/uploads/avatars/${file.filename}`;
    await this.usersService.updateMe(user._id, { avatar: url });
    return { url };
  }

  // ── Attachment upload ─────────────────────────────────────────────────────

  @Post('me/attachments')
  @ApiOperation({ summary: 'Upload an attachment (CV, certificate, etc.)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', {
    storage: makeStorage('attachments'),
    fileFilter: docFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  }))
  async uploadAttachment(
    @CurrentUser() user: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    const url = `/uploads/attachments/${file.filename}`;
    return this.usersService.addAttachment(user._id, { name: file.originalname, url });
  }

  @Delete('me/attachments/:filename')
  @ApiOperation({ summary: 'Remove an attachment' })
  removeAttachment(
    @CurrentUser() user: any,
    @Param('filename') filename: string,
  ) {
    const url = `/uploads/attachments/${filename}`;
    return this.usersService.removeAttachment(user._id, url);
  }

  // ── Admin routes ───────────────────────────────────────────────────────────

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'List all users (admin)' })
  @ApiQuery({ name: 'role', required: false })
  findAll(@Query() pagination: PaginationDto, @Query('role') role?: string) {
    return this.usersService.findAll(pagination, role);
  }

  @Get(':id')
  @Roles('admin', 'trainer', 'iqa')
  @ApiOperation({ summary: 'Get user by ID' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update user (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Deactivate user (admin)' })
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }
}
