import { IsNumber, IsOptional } from "class-validator";

export class CreateSetDto {

    @IsNumber()
    order: number;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    repetition: number;

    @IsOptional()
    @IsNumber()
    effortDuration: number;

    @IsOptional()
    @IsNumber()
    restDuration: number;
}
