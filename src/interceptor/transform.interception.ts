
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable ,map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler){
    return next
      .handle()
      .pipe(
        map(data => ({ 
          code: 0,
          data,
          message: 'success'
        }))
      )
  }
}