import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map } from "rxjs";
import { Config } from "./config";

@Injectable({
    providedIn: 'root'
})
export class ConfigService{
    private configSettings: any;
    config: Config
    constructor() {}

    get settings() {
        return this.configSettings;
    }

    init(configSettings: any) {
        this.configSettings = configSettings;
    }
}