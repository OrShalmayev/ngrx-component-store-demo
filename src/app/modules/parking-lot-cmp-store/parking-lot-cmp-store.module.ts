import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParkingLotComponent} from './parking-lot.component';
import {RouterModule} from "@angular/router";
import {ReactiveComponentModule} from "@ngrx/component";
import {ReactiveFormsModule} from "@angular/forms";
import { CarListComponent } from './cat-list/car-list.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        ParkingLotComponent,
        CarListComponent
    ],
    imports: [
        CommonModule,
        ReactiveComponentModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ParkingLotComponent
            }
        ]),
        ReactiveFormsModule,
    ]
})
export class ParkingLotCmpStoreModule {
}
