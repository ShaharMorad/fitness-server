import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { UUID, randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout } from './schemas/workout.schema';
import { UsersService } from '../users/users.service';
import { WorkoutNotFoundException } from '../common/customExceptions/workoutNotFound.exception';

// TODO: validate the user in a middleware or something

@Injectable()
export class WorkoutsService {

  constructor(@InjectModel(Workout.name) private workoutModel: Model<Workout>,
    private userService: UsersService) { }

  async create(userId: UUID, createWorkoutDto: CreateWorkoutDto): Promise<Workout[]> {
    await this.userService.getById(userId);

    if (!createWorkoutDto.date)
      createWorkoutDto.date = new Date();

    const newWorkout = { _id: randomUUID(), ...createWorkoutDto, userId }
    const createdWorkout = new this.workoutModel(newWorkout);
    createdWorkout.save();
    return this.findAllUserWorkouts(userId);
  }

  async findAllUserWorkouts(userId: UUID): Promise<Workout[]> {
    await this.userService.getById(userId);

    return this.workoutModel.find({ userId });
  }

  async getById(userId: UUID, workoutId: UUID): Promise<Workout> {
    await this.userService.getById(userId);

    const workout = await this.workoutModel.findOne({ userId, _id: workoutId })
    if (!workout)
      throw new WorkoutNotFoundException();
    else
      return workout
  }

  async getFull(userId: UUID, workoutId: UUID): Promise<any> {
    await this.userService.getById(userId);

    const workout = await this.workoutModel.aggregate([
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
            $push: '$exercises.sets' // Pushing sets into an array for each exercise
          }
        }
      },
      {
        $group: {
          _id: '$workoutId', // Grouping by workout id
          userId: { $first: '$userId' }, // Taking the first user id
          date: { $first: '$date' }, // Taking the first date
          exercises: {
            $push: {
              _id: '$_id', // Grouping by exercise id
              name: '$exerciseName', // Taking the exercise name
              sets: '$sets' // Taking the sets array
            }
          }
        }
      }
    ]);

    if (!workout)
      throw new WorkoutNotFoundException();
    else
      return workout[0]
  }


  async update(userId: UUID, workoutId: UUID, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    await this.userService.getById(userId);

    return this.workoutModel.findOneAndUpdate(
      { _id: workoutId, userId },
      { '$set': updateWorkoutDto },
      { new: true });
  }

  async remove(userId: UUID, workoutId: UUID): Promise<Workout> {
    await this.userService.getById(userId);

    return await this.workoutModel.findOneAndDelete({ _id: workoutId, userId });
  }
}
