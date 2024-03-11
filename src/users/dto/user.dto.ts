import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    username?: string;

    @IsOptional()
    @IsBoolean()
    notifications?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }