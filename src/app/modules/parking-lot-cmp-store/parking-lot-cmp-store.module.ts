import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParkingLotComponent} from './parking-lot.component';
import {RouterModule} from "@angular/router";
import {LetModule} from "@ngrx/component";


@NgModule({
    declarations: [
        ParkingLotComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ParkingLotComponent
            }
        ]),
    ]
})
export class ParkingLotCmpStoreModule {
}
