import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { url, params } = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const responseBody = {
            message: exception.message,
            statusCode: status,
            timestamp: new Date().toISOString(),
            url,
            params,
        }

        console.log({ error: responseBody });

        response
            .status(status)
            .json(responseBody);
    }
}