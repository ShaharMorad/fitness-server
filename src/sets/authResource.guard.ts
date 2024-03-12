import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ExercisesService } from '../exercises/exercises.service';
import { isUUID } from 'class-validator';
import { UUID } from 'crypto';
import { UuidExpectedException } from '../common/customExceptions/uuidExpected.exception';

@Injectable()
export class AuthResourceGuard implements CanActivate {
    constructor(private exercisesService: ExercisesService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { uid, wid, eid } = request.params;
        if (!(isUUID(uid) && isUUID(wid) && isUUID(eid)))
            throw new UuidExpectedException();

        try {
            await this.exercisesService.getById(uid as UUID, wid as UUID, eid as UUID);
            return true;
        }
        catch (e) {
            if (e.status === 404)
                throw e;
            return false;
        }
    }
}
