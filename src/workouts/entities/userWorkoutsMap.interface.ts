import { UUID } from "crypto";
import { Workout } from "./workout.entity";

export interface UsersWorkoutsMap { [key: UUID]: Workout[] }