import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID, randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateSetDto, UpdateSetDto } from './dto/set.dto';
import { Set } from './schemas/set.schema';

@Injectable()
export class SetsDal {
    constructor(@InjectModel(Set.name) private setModel: Model<Set>) { }

    create(exerciseId: UUID, createSetDto: CreateSetDto) {
        const newSet = { _id: randomUUID(), ...createSetDto, exerciseId }
        const createdWorkout = new this.setModel(newSet);
        return createdWorkout.save();
    }

    findAll(exerciseId: UUID) {
        return this.setModel.find({ exerciseId }).sort({ order: 'asc' });
    }

    findOne(exerciseId: UUID, sid: UUID) {
        return this.setModel.findOne({ exerciseId, _id: sid });
    }

    update(exerciseId: UUID, sid: UUID, updateSetDto: UpdateSetDto) {
        return this.setModel.findOneAndUpdate(
            { _id: sid, exerciseId },
            { '$set': updateSetDto },
            { new: true });
    }

    remove(exerciseId: UUID, sid: UUID) {
        return this.setModel.findOneAndDelete({ _id: sid, exerciseId });
    }
}

