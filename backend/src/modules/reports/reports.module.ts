import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { Evidence, EvidenceSchema } from '../evidence/schemas/evidence.schema';
import { Progress, ProgressSchema } from '../progress/schemas/progress.schema';
import { Learner, LearnerSchema } from '../learners/schemas/learner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Evidence.name, schema: EvidenceSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: Learner.name, schema: LearnerSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
