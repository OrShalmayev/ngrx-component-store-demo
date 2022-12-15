import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import {LetModule} from "@ngrx/component";

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LetModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
