import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(data: any, userId: string) {
    return this.courseModel.create({ ...data, instructorId: userId });
  }

  async findAll(pagination: PaginationDto, programmeId?: string) {
    const { page = 1, pageSize = 20 } = pagination;
    const filter: any = { status: 'published' };
    if (programmeId) filter.programmeId = programmeId;

    const [data, total] = await Promise.all([
      this.courseModel
        .find(filter)
        .populate('instructorId', 'firstName lastName')
        .select('-lessons')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.courseModel.countDocuments(filter),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async findById(id: string) {
    const course = await this.courseModel
      .findById(id)
      .populate('instructorId', 'firstName lastName avatar')
      .lean();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, data: any) {
    const course = await this.courseModel.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async addLesson(courseId: string, lesson: any) {
    return this.courseModel.findByIdAndUpdate(
      courseId,
      { $push: { lessons: lesson } },
      { new: true },
    ).lean();
  }

  async updateLesson(courseId: string, lessonId: string, data: any) {
    return this.courseModel.findOneAndUpdate(
      { _id: courseId, 'lessons.id': lessonId },
      { $set: { 'lessons.$': { ...data, id: lessonId } } },
      { new: true },
    ).lean();
  }
}
