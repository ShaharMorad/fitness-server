import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID, randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { Workout, WorkoutDocument } from './schemas/workout.schema';

@Injectable()
export class WorkoutsDal {

    constructor(@InjectModel(Workout.name) private workoutModel: Model<Workout>) { }

    create(userId: UUID, createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
        const newWorkout = { _id: randomUUID(), ...createWorkoutDto, userId }
        const createdWorkout = new this.workoutModel(newWorkout);
        return createdWorkout.save();
    }

    findAllUserWorkouts(userId: UUID): Promise<Workout[]> {
        return this.workoutModel.find({ userId });
    }

    getById(userId: UUID, workoutId: UUID): Promise<WorkoutDocument> {
        return this.workoutModel.findOne({ userId, _id: workoutId })
    }

    getFullById(userId: UUID, workoutId: UUID): Promise<any> {
        return this.workoutModel.aggregate([
            { $match: { userId, _id: workoutId } },
            { $unwind: '$exercises' },
            {
                $lookup: {
                    from: 'sets',
                    localField: 'exercises._id',
                    foreignField: 'exerciseId',
                    as: 'exercises.sets'
                }
            },
            { $unwind: '$exercises.sets' },
            { $sort: { 'exercises.sets.order': 1 } },
            {
                $group: {
                    _id: '$exercises._id',
                    workoutId: { $first: '$_id' },
                    userId: { $first: '$userId' },
                    date: { $first: '$date' },
                    exerciseName: { $first: '$exercises.name' },
                    sets: {
                        $push: '$exercises.sets'
                    }
                }
            },
            {
                $group: {
                    _id: '$workoutId',
                    userId: { $first: '$userId' }, 
                    date: { $first: '$date' }, 
                    exercises: {
                        $push: {
                            _id: '$_id', 
                            name: '$exerciseName', 
                            sets: '$sets' 
                        }
                    }
                }
            }
        ]);
    }


    update(userId: UUID, workoutId: UUID, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
        return this.workoutModel.findOneAndUpdate(
            { _id: workoutId, userId },
            { '$set': updateWorkoutDto },
            { new: true });
    }

    remove(userId: UUID, workoutId: UUID): Promise<Workout> {
        return this.workoutModel.findOneAndDelete({ _id: workoutId, userId });
    }
}
