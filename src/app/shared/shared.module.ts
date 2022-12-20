import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from "../core/components/not-found/not-found.component";
import {LoaderComponent} from "../core/components/loader/loader.component";


const exports = [
    NotFoundComponent,
    LoaderComponent
]

@NgModule({
    declarations: [...exports],
    exports,
    imports: [
        CommonModule
    ]
})
export class SharedModule {
}
