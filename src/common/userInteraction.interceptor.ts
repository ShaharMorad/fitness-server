import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from './logger';

@Injectable()
export class UserInteractionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const { method, url, body } = ctx.getRequest<Request>();

        const message = {
            describe: 'user interactions logger',
            method, body, url
        }

        logger.profile(message);
        return next
            .handle()
            .pipe(tap(() => logger.profile(message)));
    }
}
