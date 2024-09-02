import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request. Please check your input.';
            break;
          case 404:
            errorMessage = `Resource not found: ${error.message}`;
            break;
          case 500:
            errorMessage = 'Internal Server Error. Please try again later.';
            break;
          default:
            errorMessage = `Unexpected error: ${error.message}`;
            break;
        }

        console.error(`${error.status} HTTP Error:`, errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
