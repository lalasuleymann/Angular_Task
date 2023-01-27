import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map } from "rxjs";

interface Endpoints{ api : string; }
@Injectable({
    providedIn: 'root'
})
export class ConfigService{
    [x: string]: any;

    private endpoints = new BehaviorSubject<Endpoints | null>(null);
    readonly api$ = this.endpoints.asObservable().pipe(
        filter(endpoints => !!endpoints),
        map(endpoints => endpoints?.api)
    )
    get api(){
        return this.endpoints.getValue()?.api;
    }
    constructor(private http: HttpClient){}

    fetchEndpoints(){
          this.http.get<Endpoints>('https://localhost:44305/api/v1/config')
          .subscribe({
            next: (endpoints) => this.endpoints.next(endpoints),
            error: () => this.endpoints.next({api: ''})
          });
    }
}