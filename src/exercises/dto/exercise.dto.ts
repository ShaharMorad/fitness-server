import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";

export class CreateExerciseDto {

    @IsNotEmpty()
    name: string;
}

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}