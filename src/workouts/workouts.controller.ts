import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UUID } from 'crypto';
import { Workout } from './schemas/workout.schema';


@Controller('users/:uid/workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }

  @Post()
  create(@Param('uid', ParseUUIDPipe) uid: UUID, @Body() createWorkoutDto: CreateWorkoutDto): Promise<Workout[]> {
    return this.workoutsService.create(uid, createWorkoutDto);
  }

  @Get()
  findAll(@Param('uid', ParseUUIDPipe) uid: UUID): Promise<Workout[]> {
    return this.workoutsService.findAllUserWorkouts(uid);
  }

  @Get(':wid')
  findOne(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID): Promise<Workout> {
    return this.workoutsService.getById(uid, wid);
  }

  @Get(':wid/full')
  getFull(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID): Promise<Workout> {
    return this.workoutsService.getFull(uid, wid);
  }

  @Patch(':wid')
  update(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Body() updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    return this.workoutsService.update(uid, wid, updateWorkoutDto);
  }

  @Delete(':wid')
  remove(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID): Promise<Workout> {
    return this.workoutsService.remove(uid, wid);
  }
}
