import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from '../logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { url, params, body } = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const responseBody = {
            exception: exceptionResponse,
            timestamp: new Date().toISOString(),
            url,
            params,
            body,
        }

        logger.warn(responseBody);

        response
            .status(status)
            .json(responseBody);
    }
}