import { IsDate,IsOptional,IsDateString } from "class-validator";

export class CreateWorkoutDto {
    @IsDateString()
    @IsOptional()
    date: Date;
}
