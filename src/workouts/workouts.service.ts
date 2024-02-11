import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UUID } from 'crypto';
import { Workout } from './entities/workout.entity';
import { UsersWorkoutsMap } from './entities/userWorkoutsMap.interface';



@Injectable()
export class WorkoutsService {
  private usersWorkoutsMap: UsersWorkoutsMap = {};

  create(userId: UUID, createWorkoutDto: CreateWorkoutDto) {
    if (!this.usersWorkoutsMap[userId])
      this.usersWorkoutsMap[userId] = [];

    this.usersWorkoutsMap[userId].push(createWorkoutDto);
    return this.usersWorkoutsMap[userId]
  }

  findAll(): UsersWorkoutsMap {
    return this.usersWorkoutsMap;
  }

  findOne(id: UUID): Workout[] {
    return this.usersWorkoutsMap[id];
  }

  update(id: UUID, updateWorkoutDto: UpdateWorkoutDto): Workout[] {
    return []; //`This action updates a #${id} workout`;
  }

  remove(id: UUID): Workout[] {
    return []; //`This action removes a #${id} workout`;
  }
}
