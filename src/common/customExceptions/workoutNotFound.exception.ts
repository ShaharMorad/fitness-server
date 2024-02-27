import { NotFoundException } from "@nestjs/common";

export class WorkoutNotFoundException extends NotFoundException {
    constructor() {
        super('workout is not exists');
    }
}
