import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from '../workouts/schemas/workout.schema';
import { WorkoutsModule } from '../workouts/workouts.module';
import { ExercisesDal } from './exercises.dal';

@Module({
  imports: [WorkoutsModule, MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }])],
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesDal],
  exports:[ExercisesService],
})
export class ExercisesModule { }
