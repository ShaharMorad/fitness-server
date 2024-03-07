import { NotFoundException } from "@nestjs/common";

export class ExerciseNotFoundException extends NotFoundException {
    constructor() {
        super('exercise does not exists');
    }
}
