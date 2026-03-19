import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Progress, ProgressSchema } from './schemas/progress.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }])],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService, MongooseModule],
})
export class ProgressModule {}
