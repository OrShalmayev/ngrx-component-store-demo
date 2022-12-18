import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParkingLotComponent} from './parking-lot.component';
import {RouterModule} from "@angular/router";
import {ReactiveComponentModule} from "@ngrx/component";
import {ReactiveFormsModule} from "@angular/forms";
import { CarListComponent } from './cat-list/car-list.component';


@NgModule({
    declarations: [
        ParkingLotComponent,
        CarListComponent
    ],
    imports: [
        CommonModule,
        ReactiveComponentModule,
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
