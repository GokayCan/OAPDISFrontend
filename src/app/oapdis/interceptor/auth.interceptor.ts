import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpClient
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private jwtHelperService: JwtHelperService, private http: HttpClient) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token = this.jwtHelperService.tokenGetter();
        let newRequest: HttpRequest<any>;
        newRequest = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(newRequest);
    }

}
