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
