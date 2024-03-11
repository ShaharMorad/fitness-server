import { PartialType } from "@nestjs/mapped-types";
import { IsOptional,IsDateString } from "class-validator";

export class CreateWorkoutDto {
    @IsDateString()
    @IsOptional()
    date: Date;
}

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}