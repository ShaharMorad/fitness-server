import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { isUUID } from 'class-validator';
import { UUID } from 'crypto';
import { UuidExpectedException } from '../common/uuidExpected.exception';
import { WorkoutsService } from '../workouts/workouts.service';

@Injectable()
export class AuthResourceGuard implements CanActivate {
    constructor(private workoutsService: WorkoutsService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { uid, wid } = request.params;
        if (!(isUUID(uid) && isUUID(wid) ))
            throw new UuidExpectedException();

        try {
            await this.workoutsService.getById(uid as UUID, wid as UUID);
            return true;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            return false;
        }
    }
}
