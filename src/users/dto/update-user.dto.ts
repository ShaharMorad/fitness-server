import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    password: string;

    @IsEmail()
    @IsOptional()
    email: string ;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    height: number;

    @IsOptional()
    username: string;

    @IsOptional()
    @IsBoolean()
    notifications: boolean;
}