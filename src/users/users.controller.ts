import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    getAll(): number[] {
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: UUID): string {
        return this.userService.getById(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): User {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto): User {
        return this.userService.update(id, updateUserDto);
    }
}
