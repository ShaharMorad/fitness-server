import { Injectable } from '@nestjs/common';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';
import { UUID } from 'crypto';
import { ExerciseNotFoundException } from '../common/customExceptions/exerciseNotFound.exception';
import { WorkoutsService } from '../workouts/workouts.service';
import { ExercisesDal } from './exercises.dal';

@Injectable()
export class ExercisesService {
  constructor(private exercisesDal: ExercisesDal,
    private workoutsService: WorkoutsService) { }

  async create(userId: UUID, workoutId: UUID, createExerciseDto: CreateExerciseDto) {
    await this.workoutsService.getById(userId, workoutId);
    return this.exercisesDal.create(userId, workoutId, createExerciseDto)
  }

  async findAllWorkoutExercies(userId: UUID, wid: UUID) {
    await this.workoutsService.getById(userId, wid);
    return this.exercisesDal.findAllWorkoutExercies(userId, wid)
  }

  async getById(userId: UUID, wid: UUID, eid: UUID) {
    await this.workoutsService.getById(userId, wid);
    const exercise = await this.exercisesDal.getById(userId, wid, eid);
    if (!exercise)
      throw new ExerciseNotFoundException();
    else
      return exercise
  }

  async update(userId: UUID, wid: UUID, eid: UUID, updateExerciseDto: UpdateExerciseDto) {
    await this.workoutsService.getById(userId, wid);
    return this.exercisesDal.update(userId, wid, eid, updateExerciseDto)
  }

  async remove(userId: UUID, wid: UUID, eid: UUID) {
    await this.workoutsService.getById(userId, wid);
    return this.exercisesDal.remove(userId, wid, eid);
  }
}
