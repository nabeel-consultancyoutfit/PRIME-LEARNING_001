import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnersController } from './learners.controller';
import { LearnersService } from './learners.service';
import { Learner, LearnerSchema } from './schemas/learner.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Learner.name, schema: LearnerSchema }])],
  controllers: [LearnersController],
  providers: [LearnersService],
  exports: [LearnersService, MongooseModule],
})
export class LearnersModule {}
