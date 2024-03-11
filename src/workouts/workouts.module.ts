import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { UsersModule } from '../users/users.module';
import { WorkoutsDal } from './workouts.dal';

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, WorkoutsDal],
  exports: [WorkoutsService],
})
export class WorkoutsModule { }
