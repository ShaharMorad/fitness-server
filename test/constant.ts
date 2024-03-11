import 'dotenv/config';
import { CreateUserDto } from '../src/users/dto/user.dto';
import { CreateWorkoutDto } from '../src/workouts/dto/workout.dto';
import { CreateExerciseDto } from '../src/exercises/dto/exercise.dto';
import { CreateSetDto } from '../src/sets/dto/set.dto';

export const TEST_DB = process.env.MONGO_URI_TEST;

export const createUserDto: CreateUserDto = {
    firstName: "firstName",
    lastName: "lastName",
    password: "password",
    email: "email"
}

export const createWorkoutDto: CreateWorkoutDto = {
    date: new Date()
}

export const createExerciseDto: CreateExerciseDto = {
    name: 'bench press'
}

export const createSetDto: CreateSetDto = {
    order: 1,
    repetition: 12,
    weight: 60,
    effortDuration: 30,
    restDuration: 90
}