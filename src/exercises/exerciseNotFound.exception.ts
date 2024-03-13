import { CustomError } from "../common/custom.exception";

export class ExerciseNotFoundException extends CustomError {
    constructor(id: string) {
        super('exercise does not exists - ' + id);
    }

    getStatus() { return 404; }

    getResponse(): string {
        return this.message;
    }
}
