import { Injectable } from '@nestjs/common';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';
import { UUID } from 'crypto';
import { ExercisesDal } from './exercises.dal';
import { ExerciseNotFoundException } from './exerciseNotFound.exception';
import { WorkoutsService } from '../workouts/workouts.service';

@Injectable()
export class ExercisesService {
  constructor(private workoutsService: WorkoutsService, private exercisesDal: ExercisesDal) { }

  async create(userId: UUID, workoutId: UUID, createExerciseDto: CreateExerciseDto) {
    const workout = await this.workoutsService.getById(userId, workoutId);
    return this.exercisesDal.create(workout, createExerciseDto)
  }

  async findAllWorkoutExercies(userId: UUID, workoutId: UUID) {
    return (await this.workoutsService.getById(userId, workoutId)).exercises
  }

  async getById(userId: UUID, workoutId: UUID, exerciseId: UUID) {
    const exercise = await this.exercisesDal.getById(userId, workoutId, exerciseId);
    if (!exercise)
      throw new ExerciseNotFoundException(exerciseId);
    else
      return exercise
  }

  async update(userId: UUID, workoutId: UUID, exerciseId: UUID, updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesDal.update(userId, workoutId, exerciseId, updateExerciseDto)
  }

  async remove(userId: UUID, workoutId: UUID, exerciseId: UUID) {
    return this.exercisesDal.remove(userId, workoutId, exerciseId);
  }
}
