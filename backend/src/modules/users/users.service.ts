import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(pagination: PaginationDto, role?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = {};
    if (role) filter.role = role;

    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('-password -refreshToken')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.userModel.countDocuments(filter),
    ]);

    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password -refreshToken').lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password -refreshToken')
      .lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deactivate(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).select('-password -refreshToken').lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getMe(userId: string) {
    return this.findById(userId);
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    // Strip admin-only fields
    const { isActive, ...safeDto } = dto;
    return this.update(userId, safeDto);
  }

  async addAttachment(userId: string, attachment: { name: string; url: string }) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { attachments: { ...attachment, uploadedAt: new Date() } } },
        { new: true },
      )
      .select('-password -refreshToken')
      .lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async removeAttachment(userId: string, url: string) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { attachments: { url } } },
        { new: true },
      )
      .select('-password -refreshToken')
      .lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
