import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UUID, randomUUID } from 'crypto';
import { Workout } from './entities/workout.entity';
import { UsersWorkoutsMap } from './entities/userWorkoutsMap.interface';



@Injectable()
export class WorkoutsService {
  private usersWorkoutsMap: UsersWorkoutsMap = {};

  create(userId: UUID, createWorkoutDto: CreateWorkoutDto): Workout[] {
    if (!this.usersWorkoutsMap[userId])
      this.usersWorkoutsMap[userId] = [];

    if (!createWorkoutDto.date)
      createWorkoutDto.date = new Date();

    const newWorkout = { id: randomUUID(), exercise: [], ...createWorkoutDto }
    this.usersWorkoutsMap[userId].push(newWorkout);
    return this.usersWorkoutsMap[userId]
  }

  findAllUserWorkouts(userId: UUID): Workout[] {
    return this.usersWorkoutsMap[userId];
  }

  findOne(userId: UUID, workoutId: UUID): Workout {
    return this.findAllUserWorkouts(userId)?.find(w => w.id === workoutId);
  }

  update(userId: UUID, workoutId: UUID, { date }: UpdateWorkoutDto): Workout {
    const workout = this.findOne(userId, workoutId)
    workout.date = date ?? workout.date;
    return workout;
  }

  remove(userId: UUID, workoutId: UUID): Workout {
    const workouts = this.findAllUserWorkouts(userId)
    const indexToRemove = workouts.findIndex(w => w.id === workoutId);

    return workouts.splice(indexToRemove, 1)?.[0]
  }
}
