import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScorecardController } from './scorecard.controller';
import { ScorecardService } from './scorecard.service';
import { Scorecard, ScorecardSchema } from './schemas/scorecard.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Scorecard.name, schema: ScorecardSchema }])],
  controllers: [ScorecardController],
  providers: [ScorecardService],
  exports: [ScorecardService, MongooseModule],
})
export class ScorecardModule {}
