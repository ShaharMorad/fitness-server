import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from './logger';
import { CustomError } from './custom.exception';

@Catch(CustomError)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: CustomError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { url, params, body, method } = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const responseBody = {
            exception: exceptionResponse,
            timestamp: new Date().toISOString(),
            method, body, url, params,
        }

        logger.warn(responseBody);

        response
            .status(status)
            .json(responseBody);
    }
}