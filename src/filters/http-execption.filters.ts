import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = exception.message;

    const exceptionResponse = exception.getResponse();
    console.log('exceptionResponse', exceptionResponse);

    if (typeof exceptionResponse === 'object') {
      const exceptionRes = exceptionResponse as { message: string | string[] };
      const messages = exceptionRes.message;
      Array.isArray(messages)
        ? (message = messages[0])
        : (message = exceptionRes.message as string);
    }

    response.status(status).json({
      code: status,
      message,
    });
  }
}
