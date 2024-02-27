import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
    constructor() {
        super('user is not exists');
    }
}
