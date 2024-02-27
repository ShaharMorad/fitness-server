import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UUID } from 'crypto';
import { Workout } from './entities/workout.entity';

@Controller('users/:userid/workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post()
  create(@Param('userid', ParseUUIDPipe) userId: UUID, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(userId, createWorkoutDto);
  }

  @Get()
  findAll(@Param('userid', ParseUUIDPipe) userId: UUID): Workout[] {
    return this.workoutsService.findAllUserWorkouts(userId);
  }

  @Get(':workoutid')
  findOne(@Param('userid', ParseUUIDPipe) userId: UUID,
    @Param('workoutid', ParseUUIDPipe) workoutId: UUID): Workout {
    return this.workoutsService.findOne(userId, workoutId);
  }

  @Patch(':workoutid')
  update(@Param('userid', ParseUUIDPipe) userId: UUID,
    @Param('workoutid', ParseUUIDPipe) workoutId: UUID,
    @Body() updateWorkoutDto: UpdateWorkoutDto): Workout {
    return this.workoutsService.update(userId, workoutId, updateWorkoutDto);
  }

  @Delete(':workoutid')
  remove(@Param('userid', ParseUUIDPipe) userId: UUID,
    @Param('workoutid', ParseUUIDPipe) workoutId: UUID): Workout {
    return this.workoutsService.remove(userId, workoutId);
  }
}
