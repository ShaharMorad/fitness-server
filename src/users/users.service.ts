import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID, randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [];

    getAll(): any[] {
        return this.users;
    }

    getById(id: UUID): any {
        return this.users.find(user => user.id === id);
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
}
