import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserSchema } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID, randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserNotFoundException } from '../common/customExceptions/userNotFound.exception';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserSchema.name) private userModel: Model<UserSchema>) { }

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

    create(createUserDto: CreateUserDto): Promise<UserSchema> {
        const newUser = { _id: randomUUID(), ...createUserDto }
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }

    update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findOneAndUpdate(
            { _id: id },
            { '$set': updateUserDto },
            { new: true });
    }

    async remove(id: UUID): Promise<User> {
        return await this.userModel.findOneAndDelete({ _id: id });
    }
}
