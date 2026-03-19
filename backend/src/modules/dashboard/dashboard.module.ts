import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

// Import schemas from other modules
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { Evidence, EvidenceSchema } from '../evidence/schemas/evidence.schema';
import { Journal, JournalSchema } from '../journals/schemas/journal.schema';
import { Progress, ProgressSchema } from '../progress/schemas/progress.schema';
import { Learner, LearnerSchema } from '../learners/schemas/learner.schema';
import { Notification, NotificationSchema } from '../notifications/schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Evidence.name, schema: EvidenceSchema },
      { name: Journal.name, schema: JournalSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: Learner.name, schema: LearnerSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
