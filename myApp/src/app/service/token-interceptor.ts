import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token =JSON.parse(localStorage.getItem("access_token"));
        if(token && token.token) {
            const newRequest = request.clone({
                headers: new HttpHeaders({"Authorization" : "Bearer " + token.token})
            });

            return next.handle(newRequest);
        }
      
        return next.handle(request);
    }
}