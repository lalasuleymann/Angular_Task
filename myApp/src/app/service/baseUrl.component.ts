import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class BaseService{
    BaseApiUrl : string = 'https://localhost:44305/api/v1/'
}