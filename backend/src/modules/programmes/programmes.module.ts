import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgrammesController } from './programmes.controller';
import { ProgrammesService } from './programmes.service';
import { Programme, ProgrammeSchema } from './schemas/programme.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Programme.name, schema: ProgrammeSchema }])],
  controllers: [ProgrammesController],
  providers: [ProgrammesService],
  exports: [ProgrammesService, MongooseModule],
})
export class ProgrammesModule {}
