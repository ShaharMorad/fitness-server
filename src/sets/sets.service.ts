import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { UUID, randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Set } from './schemas/set.schema';
import { ExercisesService } from '../exercises/exercises.service';

@Injectable()
export class SetsService {
  constructor(@InjectModel(Set.name) private setModel: Model<Set>,
    private exercisesService: ExercisesService) { }

  async create(uid: UUID, wid: UUID, eid: UUID, createSetDto: CreateSetDto) {
    await this.exercisesService.getById(uid, wid, eid);

    const newSet = { _id: randomUUID(), ...createSetDto, exerciseId: eid }
    const createdWorkout = new this.setModel(newSet);
    return createdWorkout.save();
  }

  async findAll(uid: UUID, wid: UUID, eid: UUID) {
    await this.exercisesService.getById(uid, wid, eid);

    return await this.setModel.find({ exerciseId: eid }).sort({ order: 'asc' });
  }

  async findOne(uid: UUID, wid: UUID, eid: UUID, sid: UUID) {
    await this.exercisesService.getById(uid, wid, eid);

    return await this.setModel.findOne({ exerciseId: eid, _id: sid });
  }

  async update(uid: UUID, wid: UUID, eid: UUID, sid: UUID, updateSetDto: UpdateSetDto) {
    await this.exercisesService.getById(uid, wid, eid);

    return this.setModel.findOneAndUpdate(
      { _id: sid, exerciseId: eid },
      { '$set': updateSetDto },
      { new: true });
  }

  async remove(uid: UUID, wid: UUID, eid: UUID, sid: UUID) {
    await this.exercisesService.getById(uid, wid, eid);

    return await this.setModel.findOneAndDelete({ _id: sid, exerciseId: eid });
  }
}
