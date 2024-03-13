import { CustomError } from "../common/custom.exception";

export class SetNotFoundException extends CustomError {
    constructor(id: string) {
        super('set does not exists - ' + id);
    }

    getStatus() { return 404; }

    getResponse(): string {
        return this.message;
    }
}
