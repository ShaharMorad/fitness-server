import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UUID, randomUUID } from 'crypto';
import { UserNotFoundException } from '../common/customExceptions/userNotFound.exception';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    getAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async getById(id: UUID): Promise<User> {
        const user = await this.userModel.findOne({ _id: id })
        if (!user)
            throw new UserNotFoundException();
        else
            return user
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = { _id: randomUUID(), ...createUserDto }
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }

    async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
        const result = await this.userModel.findOneAndUpdate(
            { _id: id },
            { $set: updateUserDto },
            { new: true });
        if (!result)
            throw new UserNotFoundException();
        return result;
    }

    async remove(id: UUID): Promise<User> {
        const result = await this.userModel.findOneAndDelete({ _id: id });
        if (!result)
            throw new UserNotFoundException();
        return result;
    }
}
