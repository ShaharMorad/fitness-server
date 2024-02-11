import { UUID } from "crypto";
import { Exercise } from "./exercise.entity";

export interface Workout {
    id: UUID;
    exercise: Exercise[];
    startTime: Date;
    endTime: Date;
    planedTime: Date;
}
