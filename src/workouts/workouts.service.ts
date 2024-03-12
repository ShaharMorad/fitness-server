import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { UUID } from 'crypto';
import { Workout } from './schemas/workout.schema';
import { WorkoutNotFoundException } from '../common/customExceptions/workoutNotFound.exception';
import { WorkoutsDal } from './workouts.dal';

@Injectable()
export class WorkoutsService {

  constructor(private workoutsDal: WorkoutsDal) { }

  async create(userId: UUID, createWorkoutDto: CreateWorkoutDto): Promise<Workout[]> {
    if (!createWorkoutDto.date)
      createWorkoutDto.date = new Date();

    await this.workoutsDal.create(userId, createWorkoutDto);
    return this.findAllUserWorkouts(userId);
  }

  async findAllUserWorkouts(userId: UUID): Promise<Workout[]> {
    return this.workoutsDal.findAllUserWorkouts(userId);
  }

  async getById(userId: UUID, workoutId: UUID): Promise<Workout> {

    const workout = await this.workoutsDal.getById(userId, workoutId)
    if (!workout)
      throw new WorkoutNotFoundException();
    else
      return workout
  }

  async getFull(userId: UUID, workoutId: UUID): Promise<any> {
    const workout = await this.workoutsDal.getFull(userId, workoutId);

    if (!workout)
      throw new WorkoutNotFoundException();
    else
      return workout[0]
  }

  async update(userId: UUID, workoutId: UUID, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    return this.workoutsDal.update(userId, workoutId, updateWorkoutDto);
  }

  async remove(userId: UUID, workoutId: UUID): Promise<Workout> {
    return this.workoutsDal.remove(userId, workoutId);
  }
}
