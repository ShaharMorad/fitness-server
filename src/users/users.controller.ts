import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: UUID): Promise<User> {
        return this.userService.getById(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<User> {
        return this.userService.remove(id);
    }
}
