import { NotFoundException } from "@nestjs/common";

export class SetNotFoundException extends NotFoundException {
    constructor() {
        super('set does not exists');
    }
}
