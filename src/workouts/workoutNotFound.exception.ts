import { CustomError } from "../common/custom.exception";

export class WorkoutNotFoundException extends CustomError {
    constructor(id: string) {
        super('workout does not exists - ' + id);
    }

    getStatus() { return 404; }

    getResponse(): string {
        return this.message;
    }
}
