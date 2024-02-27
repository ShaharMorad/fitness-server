import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID, randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserNotFoundException } from '../common/customExceptions/userNotFound.exception';

@Injectable()
export class UsersService {
    private users: User[] = [];

    getAll(): User[] {
        return this.users;
    }

    getById(id: UUID): User {
        const user = this.users.find(user => user.id === id)
        if (!user)
            throw new UserNotFoundException();
        return user 
    }

    create(createUserDto: CreateUserDto): User {
        const newUser = { id: randomUUID(), ...createUserDto }
        this.users.push(newUser)
        return newUser;
    }

    update(id: UUID, updateUserDto: UpdateUserDto): User {
        this.users = this.users.map(user => {
            if (user.id === id)
                return { ...user, ...updateUserDto }
            return user;
        })
        return this.getById(id);
    }

    remove(id: UUID): User {
        const indexToRemove = this.users.findIndex(u => u.id === id);
        return this.users.splice(indexToRemove, 1)?.[0]
    }
}
