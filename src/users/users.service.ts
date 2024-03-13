import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UUID } from 'crypto';
import { UserNotFoundException } from './userNotFound.exception';
import { UsersDal } from './users.dal';

@Injectable()
export class UsersService {
    constructor(private userDal: UsersDal) { }

    getAll(): Promise<User[]> {
        return this.userDal.getAll();
    }

    async getById(id: UUID): Promise<User> {
        const user = await this.userDal.getById(id)
        if (!user)
            throw new UserNotFoundException(id);
        else
            return user
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        return this.userDal.create(createUserDto);
    }

    async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
        const result = await this.userDal.update(id, updateUserDto);
        if (!result)
            throw new UserNotFoundException(id);
        return result;
    }

    async remove(id: UUID): Promise<User> {
        const result = await this.userDal.remove(id);
        if (!result)
            throw new UserNotFoundException(id);
        return result;
    }
}
