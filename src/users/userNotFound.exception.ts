import { CustomError } from "../common/custom.exception";

export class UserNotFoundException extends CustomError {
    constructor(id: string) {
        super('user does not exists - ' + id);
    }

    getStatus() { return 404; }

    getResponse(): string {
        return this.message;
    }
}
