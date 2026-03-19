import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { Journal, JournalSchema } from './schemas/journal.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Journal.name, schema: JournalSchema }])],
  controllers: [JournalsController],
  providers: [JournalsService],
  exports: [JournalsService, MongooseModule],
})
export class JournalsModule {}
