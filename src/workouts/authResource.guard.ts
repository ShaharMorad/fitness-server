import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { isUUID } from 'class-validator';
import { UUID } from 'crypto';
import { UuidExpectedException } from '../common/customExceptions/uuidExpected.exception';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthResourceGuard implements CanActivate {
    constructor(private usersService: UsersService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { uid } = request.params;
        if (!isUUID(uid))
            throw new UuidExpectedException();

        try {
            await this.usersService.getById(uid as UUID);
            return true;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            return false;
        }
    }
}
