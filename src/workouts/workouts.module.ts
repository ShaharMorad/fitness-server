import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule { }
