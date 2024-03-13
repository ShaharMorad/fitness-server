import { CustomError } from "./custom.exception";

export class UuidExpectedException extends CustomError {
    constructor() {
        super("Bad Request");
    }

    getStatus(): number {
        return 400;
    }
    getResponse(): string {
        return "Validation failed (uuid is expected)"
    }
}
