import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const { method, url, body, } = ctx.getRequest<Request>();

        const now = Date.now();        
        return next
            .handle()
            .pipe(
                tap(() => console.log({ method, url, body, duration: `${Date.now() - now}ms` })),
                // map(response => {
                //     console.log({ method, url, body, duration: `${Date.now() - now}ms`, response })
                //     return response
                // }),
            );
    }
}
