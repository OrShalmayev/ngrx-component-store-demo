import {Component} from '@angular/core';
import {EAppRoutes} from "./models/routes.models";
import {APP_ROUTES} from "./data/routes.data";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'my-component-store-demo';
    links = APP_ROUTES
}
