import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UUID, randomUUID } from 'crypto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersDal {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    getAll(): Promise<User[]> {
        return this.userModel.find();
    }

    getById(id: UUID): Promise<User> {
        return this.userModel.findOne({ _id: id })
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = { _id: randomUUID(), ...createUserDto }
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }

    async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findOneAndUpdate(
            { _id: id },
            { $set: updateUserDto },
            { new: true });
    }

    async remove(id: UUID): Promise<User> {
        return await this.userModel.findOneAndDelete({ _id: id });
    }
}
