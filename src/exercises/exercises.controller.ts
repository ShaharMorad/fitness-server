import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { UUID } from 'crypto';

@Controller('users/:uid/workouts/:wid')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  create(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(uid, wid, createExerciseDto);
  }

  @Get()
  findAll(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID) {
    return this.exercisesService.findAllWorkoutExercies(uid, wid);
  }

  @Get(':eid')
  findOne(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Param('eid', ParseUUIDPipe) eid: UUID,
  ) {
    return this.exercisesService.getById(uid, wid, eid);
  }

  @Patch(':eid')
  update(@Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(uid, wid, eid, updateExerciseDto);
  }

  @Delete(':eid')
  remove(@Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
  ) {
    return this.exercisesService.remove(uid, wid, eid);
  }
}
