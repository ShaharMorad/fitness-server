import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto,UpdateExerciseDto } from './dto/exercise.dto';
import { UUID } from 'crypto';
import { AuthResourceGuard } from './authResource.guard';

@UseGuards(AuthResourceGuard)
@Controller('users/:uid/workouts/:wid/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  create(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID,
    @Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(userId, workoutId, createExerciseDto);
  }

  @Get()
  findAll(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID) {
    return this.exercisesService.findAllWorkoutExercies(userId, workoutId);
  }

  @Get(':eid')
  findOne(@Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID,
    @Param('eid', ParseUUIDPipe) exerciseId: UUID,
  ) {
    return this.exercisesService.getById(userId, workoutId, exerciseId);
  }

  @Patch(':eid')
  update(@Param('eid', ParseUUIDPipe) exerciseId: UUID,
    @Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID,
    @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(userId, workoutId, exerciseId, updateExerciseDto);
  }

  @Delete(':eid')
  remove(@Param('eid', ParseUUIDPipe) exerciseId: UUID,
    @Param('uid', ParseUUIDPipe) userId: UUID,
    @Param('wid', ParseUUIDPipe) workoutId: UUID,
  ) {
    return this.exercisesService.remove(userId, workoutId, exerciseId);
  }
}
