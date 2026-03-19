import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { buildSkip, buildPaginationMeta } from '../../common/utils/pagination.util';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async enroll(learnerId: string, courseId: string) {
    const existing = await this.enrollmentModel.findOne({
      learnerId: new Types.ObjectId(learnerId),
      courseId: new Types.ObjectId(courseId),
    });
    if (existing) throw new ConflictException('Already enrolled in this course');
    return this.enrollmentModel.create({ learnerId, courseId });
  }

  async getMyEnrollments(userId: string, pagination: PaginationDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const [data, total] = await Promise.all([
      this.enrollmentModel
        .find({ learnerId: new Types.ObjectId(userId) })
        .populate('courseId', 'title description thumbnail duration')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.enrollmentModel.countDocuments({ learnerId: new Types.ObjectId(userId) }),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }

  async getEnrollment(learnerId: string, courseId: string) {
    const enrollment = await this.enrollmentModel
      .findOne({ learnerId: new Types.ObjectId(learnerId), courseId: new Types.ObjectId(courseId) })
      .populate('courseId')
      .lean();
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }

  async updateLessonProgress(enrollmentId: string, lessonId: string, timeSpent: number) {
    const enrollment = await this.enrollmentModel.findById(enrollmentId);
    if (!enrollment) throw new NotFoundException('Enrollment not found');

    const existingLesson = enrollment.lessonProgress.find((lp) => lp.lessonId === lessonId);
    if (existingLesson) {
      await this.enrollmentModel.findOneAndUpdate(
        { _id: enrollmentId, 'lessonProgress.lessonId': lessonId },
        {
          $set: {
            'lessonProgress.$.completed': true,
            'lessonProgress.$.completedAt': new Date(),
            'lessonProgress.$.timeSpent': timeSpent,
          },
        },
      );
    } else {
      await this.enrollmentModel.findByIdAndUpdate(enrollmentId, {
        $push: {
          lessonProgress: { lessonId, completed: true, completedAt: new Date(), timeSpent },
        },
      });
    }

    // Recalculate progress
    const updated = await this.enrollmentModel.findById(enrollmentId).populate('courseId').lean();
    return updated;
  }

  async findByCourse(courseId: string, pagination: PaginationDto) {
    const { page = 1, pageSize = 20 } = pagination;
    const [data, total] = await Promise.all([
      this.enrollmentModel
        .find({ courseId: new Types.ObjectId(courseId) })
        .populate('learnerId', 'firstName lastName email')
        .skip(buildSkip(page, pageSize))
        .limit(pageSize)
        .lean(),
      this.enrollmentModel.countDocuments({ courseId: new Types.ObjectId(courseId) }),
    ]);
    return { success: true, data, meta: buildPaginationMeta(total, page, pageSize) };
  }
}
