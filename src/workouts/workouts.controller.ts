import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, UsePipes } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { UUID } from 'crypto';
import { Workout } from './schemas/workout.schema';
import { AuthResourceGuard } from './authResource.guard';

@UseGuards(AuthResourceGuard)
@Controller('users/:uid/workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post()
  create(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Body() createWorkoutDto: CreateWorkoutDto): Promise<Workout[]> {
    return this.workoutsService.create(userId, createWorkoutDto);
  }

  @Get()
  findAll(@Param('uid', ParseUUIDPipe) userId: UUID): Promise<Workout[]> {
    return this.workoutsService.findAllUserWorkouts(userId);
  }

  @Get(':wid')
  findOne(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID): Promise<Workout> {
    return this.workoutsService.getById(userId, workoutId);
  }

  @Get(':wid/full')
  getFullById(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID): Promise<Workout> {
    return this.workoutsService.getFullById(userId, workoutId);
  }

  @Patch(':wid')
  update(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID,
    @Body() updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    return this.workoutsService.update(userId, workoutId, updateWorkoutDto);
  }

  @Delete(':wid')
  remove(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID): Promise<Workout> {
    return this.workoutsService.remove(userId, workoutId);
  }
}
