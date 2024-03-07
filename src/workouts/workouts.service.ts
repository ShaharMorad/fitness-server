import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UUID, randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout } from './schemas/workout.schema';
import { UsersService } from 'src/users/users.service';
import { WorkoutNotFoundException } from 'src/common/customExceptions/workoutNotFound.exception';

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
