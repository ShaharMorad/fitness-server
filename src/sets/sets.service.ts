import { Injectable } from '@nestjs/common';
import { CreateSetDto, UpdateSetDto } from './dto/set.dto';
import { UUID } from 'crypto';
import { SetsDal } from './sets.dal';
import { SetNotFoundException } from './setNotFound.exception';

@Injectable()
export class SetsService {
  constructor(private setsDal: SetsDal) { }

  async create(eid: UUID, createSetDto: CreateSetDto) {
    return this.setsDal.create(eid, createSetDto);
  }

  async findAll(eid: UUID) {
    return this.setsDal.findAll(eid);
  }

  async findOne(eid: UUID, sid: UUID) {
    const set = await this.setsDal.findOne(eid, sid);
    if (!set)
      throw new SetNotFoundException(sid);
    else
      return set
  }

  async update(eid: UUID, sid: UUID, updateSetDto: UpdateSetDto) {
    return this.setsDal.update(eid, sid, updateSetDto);
  }

  async remove(eid: UUID, sid: UUID) {
    return await this.setsDal.remove(eid, sid);
  }
}
