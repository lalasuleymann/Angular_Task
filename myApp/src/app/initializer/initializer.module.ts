import { APP_INITIALIZER,NgModule } from "@angular/core";
import { take } from "rxjs";
import { ConfigService } from "./config.service";

@NgModule({
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (config: ConfigService)=>{
                return ()=>{
                     config.settings();
                     return config.init(take(1))
                }
            },
            deps: [ConfigService]
        }
    ]
})

export class InitializerModule{}