import { Injectable } from '@nestjs/common';
import { CreateSetDto, UpdateSetDto } from './dto/set.dto';
import { UUID } from 'crypto';
import { ExercisesService } from '../exercises/exercises.service';
import { SetsDal } from './sets.dal';

@Injectable()
export class SetsService {
  constructor(private setsDal: SetsDal,
    private exercisesService: ExercisesService) { }

  async create(uid: UUID, wid: UUID, eid: UUID, createSetDto: CreateSetDto) {
    await this.exercisesService.getById(uid, wid, eid);
    return this.setsDal.create(eid, createSetDto);
  }

  async findAll(uid: UUID, wid: UUID, eid: UUID) {
    await this.exercisesService.getById(uid, wid, eid);
    return this.setsDal.findAll(eid);
  }

  async findOne(uid: UUID, wid: UUID, eid: UUID, sid: UUID) {
    await this.exercisesService.getById(uid, wid, eid);
    return await this.setsDal.findOne(eid, sid);
  }

  async update(uid: UUID, wid: UUID, eid: UUID, sid: UUID, updateSetDto: UpdateSetDto) {
    await this.exercisesService.getById(uid, wid, eid);
    return this.setsDal.update(eid, sid, updateSetDto);
  }

  async remove(uid: UUID, wid: UUID, eid: UUID, sid: UUID) {
    await this.exercisesService.getById(uid, wid, eid);
    return await this.setsDal.remove(eid, sid);
  }
}
