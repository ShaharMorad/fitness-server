import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        const { method, originalUrl: url, body } = req;
        console.log({ method, url, body });
        next();
    }
}