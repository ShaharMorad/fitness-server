import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { UUID, randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseNotFoundException } from '../common/customExceptions/exerciseNotFound.exception';
import { Workout } from '../workouts/schemas/workout.schema';
import { WorkoutsService } from '../workouts/workouts.service';

@Injectable()
export class ExercisesService {
  constructor(@InjectModel(Workout.name) private workoutModel: Model<Workout>,
    private workoutsService: WorkoutsService) { }

  async create(userId: UUID, workoutId: UUID, createExerciseDto: CreateExerciseDto) {
    await this.workoutsService.getById(userId, workoutId);

    const workout = await this.workoutModel.findOne({ userId, _id: workoutId })
    workout.exercises.push({ _id: randomUUID(), ...createExerciseDto })

    return workout.save();
  }

  async findAllWorkoutExercies(userId: UUID, wid: UUID) {
    await this.workoutsService.getById(userId, wid);

    const workout = await this.workoutModel.findOne({ userId, _id: wid });
    return workout.exercises;
  }

  async getById(userId: UUID, wid: UUID, eid: UUID) {
    await this.workoutsService.getById(userId, wid);

    const exercise = await this.workoutModel.findOne({ userId, _id: wid, 'exercises._id': eid },
      { 'exercises.$': 1 },
    );
    if (!exercise)
      throw new ExerciseNotFoundException();
    else
      return exercise
  }

  async update(userId: UUID, wid: UUID, eid: UUID, updateExerciseDto: UpdateExerciseDto) {
    await this.workoutsService.getById(userId, wid);

    return this.workoutModel.findOneAndUpdate(
      { _id: wid, userId, 'exercises._id': eid },
      { $set: { 'exercises.$[elem].name': updateExerciseDto.name } },
      { arrayFilters: [{ 'elem._id': eid }], new: true }
    )
  }

  async remove(userId: UUID, wid: UUID, eid: UUID) {
    await this.workoutsService.getById(userId, wid);

    return this.workoutModel.findOneAndUpdate(
      { _id: wid, userId, },
      { $pull: { exercises: { _id: eid } } },
      { new: true });
  }
}
