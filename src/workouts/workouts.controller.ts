import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UUID } from 'crypto';
import { Workout } from './entities/workout.entity';
import { UsersWorkoutsMap } from './entities/userWorkoutsMap.interface';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post(':id')
  create(@Param('id') userId: UUID, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(userId, createWorkoutDto);
  }

  @Get()
  findAll(): UsersWorkoutsMap {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Workout[] {
    return this.workoutsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateWorkoutDto: UpdateWorkoutDto): Workout[] {
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID): Workout[] {
    return this.workoutsService.remove(id);
  }
}
