import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            //Subscribes to the user observable, takes the user, then unsubscribes
            take(1),
            //Subscribes to the http observable
            exhaustMap(user => {

                if(!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            })
        );
    }
}