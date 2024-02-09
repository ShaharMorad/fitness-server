import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, } from 'class-validator';

export class UpdateUserDto {
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