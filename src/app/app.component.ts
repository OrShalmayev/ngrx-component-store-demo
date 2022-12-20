import {ChangeDetectionStrategy, Component} from '@angular/core';
import {APP_ROUTES} from "./data/routes.data";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'my-component-store-demo';
    links = APP_ROUTES
}
