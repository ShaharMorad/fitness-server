import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Set, SetSchema } from './schemas/set.schema';
import { ExercisesModule } from '../exercises/exercises.module';
import { SetsDal } from './sets.dal';

@Module({
  imports: [ExercisesModule, MongooseModule.forFeature([{ name: Set.name, schema: SetSchema }])],
  controllers: [SetsController],
  providers: [SetsService, SetsDal],
})
export class SetsModule { }
