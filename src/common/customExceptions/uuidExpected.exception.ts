import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UuidExpectedException extends BadRequestException {
    constructor() {
        super({
            "message": "Validation failed (uuid is expected)",
            "error": "Bad Request",
            "statusCode": 400
        });
    }
}
