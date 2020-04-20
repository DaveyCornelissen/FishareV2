import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/shared/interface/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    const request = context.getArgByIndex(0);
    return next.handle().pipe(map(data => ({
      path: request.url,
      timestamp: new Date().toISOString(),
      data: data
    })));
  }
}
