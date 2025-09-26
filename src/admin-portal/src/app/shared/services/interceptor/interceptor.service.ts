import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private coreService: CoreService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authenticationService.getAuthToken() || this.authenticationService.getUserDetails()?.token;

    let authReq = req.clone({
      setHeaders: {
       
        'access-token': token || '',
        'appname': this.coreService.getAppName(),
        'usertype': this.coreService.getUserType()
      }
    });

    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Handle success
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Token expired / unauthorized
          this.authenticationService.saveLogin(null);
          this.router.navigate(['/pages/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
