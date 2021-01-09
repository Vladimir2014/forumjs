import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./modules/auth/services/auth.service";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, switchMap, filter, take } from "rxjs/operators";
import { LoginResponsePayload } from "./modules/auth/models/login.response.payload";

@Injectable ({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepting: ', req);
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            console.log('intercepting1: ', req);
            return next.handle(req);
        }

        const jwtToken = this.authService.getJwtToken();

         if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && error.status === 403) {
                        console.log('intercepting2: ', req);
                    return this.handleAuthErrors(req, next);
                } else {
                    console.log('intercepting3: ', req);
                    return throwError(error);
                }
            }));
        }
        console.log('intercepting4: ', req);
        return next.handle(req);
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    private addToken(req: HttpRequest<any>, jwtToken: string): HttpRequest<any> {
        console.log('adding token: ', jwtToken); 

        return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)});
    }
}