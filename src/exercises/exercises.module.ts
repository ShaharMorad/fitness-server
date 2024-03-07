import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from 'src/workouts/schemas/workout.schema';
import { WorkoutsModule } from 'src/workouts/workouts.module';

@Module({
  imports: [WorkoutsModule, MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule { }
