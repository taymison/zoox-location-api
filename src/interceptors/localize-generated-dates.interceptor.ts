import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LocalizeGeneratedDatesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => {
      if (Array.isArray(data)) {
        data?.forEach(state => {
          state?.created_at?.setHours(this.subtractHoursFromUTC(state.created_at));
          state?.updated_at?.setHours(this.subtractHoursFromUTC(state.updated_at));
        });
      } else {
        data?.created_at?.setHours(this.subtractHoursFromUTC(data.created_at));
        data?.updated_at?.setHours(this.subtractHoursFromUTC(data.updated_at));
      }

      return data;
    }));
  }

  private subtractHoursFromUTC(date: Date): number {
    return date.getHours() - 3;
  }
}
