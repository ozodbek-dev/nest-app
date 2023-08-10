import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log("this is before intercepting req")
    return next.handle().pipe(
      map((data) => {
        return data
      })
    );
  }
}