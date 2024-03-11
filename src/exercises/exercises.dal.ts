import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID, randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { Workout } from '../workouts/schemas/workout.schema';
import { CreateExerciseDto, UpdateExerciseDto } from './dto/exercise.dto';

@Injectable()
export class ExercisesDal {
    constructor(@InjectModel(Workout.name) private workoutModel: Model<Workout>) { }

    async create(userId: UUID, workoutId: UUID, createExerciseDto: CreateExerciseDto) {
        const workout = await this.workoutModel.findOne({ userId, _id: workoutId })
        workout.exercises.push({ _id: randomUUID(), ...createExerciseDto })
        return workout.save();
    }

    async findAllWorkoutExercies(userId: UUID, wid: UUID) {
        const workout = await this.workoutModel.findOne({ userId, _id: wid });
        return workout.exercises;
    }

    getById(userId: UUID, wid: UUID, eid: UUID) {
        return this.workoutModel.findOne({ userId, _id: wid, 'exercises._id': eid },
            { 'exercises.$': 1 },
        );
    }

    update(userId: UUID, wid: UUID, eid: UUID, updateExerciseDto: UpdateExerciseDto) {
        return this.workoutModel.findOneAndUpdate(
            { _id: wid, userId, 'exercises._id': eid },
            { $set: { 'exercises.$[elem].name': updateExerciseDto.name } },
            { arrayFilters: [{ 'elem._id': eid }], new: true }
        )
    }

    remove(userId: UUID, wid: UUID, eid: UUID) {
        return this.workoutModel.findOneAndUpdate(
            { _id: wid, userId, },
            { $pull: { exercises: { _id: eid } } },
            { new: true });
    }
}
