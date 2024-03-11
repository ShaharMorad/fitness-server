import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        // const { method, originalUrl: url, body } = req;
        // logger.info({ method, url, body });
        next();
    }
}